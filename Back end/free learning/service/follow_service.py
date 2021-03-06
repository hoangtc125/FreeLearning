from exception.http_exception import RequestException
from connections.mongo_connector import get_repo
from model.follow import Follow, FollowResponse
from model.user import Account
from model.comment import Comment, CommentCreate, CommentResponse
from utils.model_utils import get_dict, to_response_dto
from connections.config import FOLLOW_COLLECTION, USER_COLLECTION, COMMENT_COLLECTION, POST_COLLECTION
from service.user_service import AccountService
from service.notification_service import NotificationService
from model.search import SearchAccount
from service.business_service import BusinessService
from model.status import Status, StatusCreate
from core.cache_config import cache


class FollowService:
    def __init__(self):
        self.account_repo = get_repo(Account, USER_COLLECTION)
        self.follow_repo = get_repo(Follow, FOLLOW_COLLECTION)
        self.comment_repo = get_repo(Comment, COMMENT_COLLECTION)
        self.status_repo = get_repo(Status, POST_COLLECTION)

    async def subcribe(self, subcriber: str, publisher: str):
        if subcriber == publisher:
            raise RequestException(message="Can't follow yourself")
        _publisher = await AccountService().get_account_by_field(field="username", value=publisher)
        if not _publisher:
            raise RequestException(message="Publisher doesn't exist")
        message = ""
        list_fl = [subcriber]
        res = await self.follow_repo.get_one_by_id(doc_id=publisher)
        if not res:
            follower = Follow(followers=list_fl)
            await self.follow_repo.insert_one(obj=follower, custom_id=publisher)
        else:
            doc_id, fl = res
            list_fl = getattr(fl, "followers")
            if subcriber in list_fl:
                list_fl.remove(subcriber)
                message = "Unsubcribe successfull"
            else:
                list_fl.append(subcriber)
                message = "Subcribe successfull"
                await NotificationService().create_follow_notification(fullname=_publisher.fullname, id=_publisher.id, username=subcriber)
            await self.follow_repo.update_one_by_field(
                doc_id=doc_id, field="followers", value=list_fl
            )
        return {
            "status_code": "200",
            "message": message,
            "data": {"_id": publisher, "followers": list_fl},
        }

    @cache(reloaded_by=[Account, Follow, Comment, Status])
    async def get_followers(self, username: str):
        _account = await AccountService().get_account_by_field(field="username", value=username)
        if not _account:
            raise RequestException(message="Account doesn't exist")
        res = await self.follow_repo.get_one_by_id(doc_id=username)
        if not res:
            return []
        doc_id, follow = res
        users = []
        for fl in follow.followers:
            user = await AccountService().get_account_by_field(field="username", value=fl)
            if not user:
                continue
            users.append(SearchAccount(**get_dict(user)))
        return to_response_dto(doc_id, Follow(followers=users), FollowResponse)

    @cache(reloaded_by=[Account, Follow, Comment, Status])
    async def get_min_followers(self, username: str):
        _account = await AccountService().get_account_by_field(field="username", value=username)
        if not _account:
            raise RequestException(message="Account doesn't exist")
        res = await self.follow_repo.get_one_by_id(doc_id=username)
        if not res:
            return None
        doc_id, follow = res
        return to_response_dto(doc_id, follow, FollowResponse)

    async def create_comment(self, comment_create: CommentCreate):
        account = await AccountService().get_account_by_field(value=comment_create.at_username)
        if not account:
            raise RequestException(message="Not found account")
        comment_create.user_id = account.id
        comment_create.avatar = account.avatar
        comment_create.fullname = account.fullname
        comment = Comment(**get_dict(comment_create))
        await self.comment_repo.insert_one(obj = comment)
        _, user = await BusinessService().get_one_lession_by_id(doc_id=comment_create.at_blog)
        await NotificationService().create_comment_notification(comment_create=comment_create, user_id=user.id)
        return "Success"

    @cache(reloaded_by=[Account, Follow, Comment, Status])
    async def get_comments(self, blog_id: str):
        filter = {"_source.at_blog": blog_id}
        res = await self.comment_repo.get_all(filter=filter)
        if not res:
            return None
        list_resp = []
        for _id, value in res.items():
            list_resp.append(to_response_dto(_id, value, CommentResponse))
        return list_resp

    @cache(reloaded_by=[Account, Follow, Comment, Status])
    async def get_status(self, user_id: str):
        account = await AccountService().get_account_by_id(user_id)
        if not account:
            raise RequestException(message="Not found account")
        filter = {"_source.user_id": user_id}
        status = await self.status_repo.get_all(filter=filter)
        if not status:
            return None
        res = []
        for k, v in status.items():
            res.append(v)
        return res

    async def create_status(self, status_create: StatusCreate, actor: str):
        account = await AccountService().get_account_by_field(value=actor)
        if not account:
            raise RequestException(message="Not found account")
        status = Status(**get_dict(status_create))
        doc_id = await self.status_repo.insert_one(obj=status)
        if not doc_id:
            return None
        return doc_id