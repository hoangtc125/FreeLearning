import uuid
from exception.http_exception import CredentialException, RequestException
from connections.mongo_connector import get_repo
from model.notification import Notification, NotificationCreate, NotificationResponse
from model.comment import CommentCreate
from model.lession import LessionCreate
from utils.model_utils import get_dict, to_response_dto
from utils.time_utils import get_current_timestamp
from connections.config import NOTIFICATION_COLLECTION
from core.api_config import UserAPI 
from service.user_service import AccountService


class NotificationService:
    def __init__(self):
        self.notification_repo = get_repo(Notification, NOTIFICATION_COLLECTION)

    async def get_notifications(self, user_id: str):
        filter = {"_source.user_id": user_id}
        res = await self.notification_repo.get_all(filter=filter)
        if not res:
            return None
        list_resp = []
        for _id, value in res.items():
            list_resp.append(to_response_dto(_id, value, NotificationResponse))
        return list_resp

    async def create_notification(self, notification_create: NotificationCreate):
        notification = Notification(**get_dict(notification_create))
        doc_id = await self.notification_repo.insert_one(obj=notification)
        return doc_id

    async def read_notification(self, notification_id: str):
        res = await self.notification_repo.get_one_by_id(doc_id=uuid.UUID(notification_id))
        if not res:
            raise CredentialException(message="Not found notification")
        doc_id, notification = res
        notification.is_read = True
        _notification = Notification(**get_dict(notification))
        await self.notification_repo.update(doc_id=doc_id, obj=_notification)
        return "Successfull"

    async def create_comment_notification(self, comment_create: CommentCreate):
        notification_create = NotificationCreate(
            created_at=get_current_timestamp(),
            content='Bạn có 1 bình luận mới ở bài viết ',
            user_id=comment_create.user_id,
            href=UserAPI.GET_ONE_LESSION + '?lession_id=' + comment_create.at_blog,
        )
        await self.create_notification(notification_create=notification_create)
        return None

    async def create_follow_notification(self, fullname: str, id: str, username: str):
        user = await AccountService().get_account_by_field(value=username)
        notification_create = NotificationCreate(
            created_at = get_current_timestamp(),
            content=f"{fullname} đã bắt đầu theo dõi bạn ",
            user_id=id,
            href=UserAPI.FIND_ONE + '?id=' + user.id
        )
        await self.create_notification(notification_create=notification_create)
        return None

    async def create_lession_notification(self, user_id: str, lession: LessionCreate, lession_id: str):
        notification_create = NotificationCreate(
            created_at = get_current_timestamp(),
            content=f"{lession.name} đã được tạo thành công ",
            user_id=user_id,
            href=UserAPI.GET_ONE_LESSION + '?lession_id=' + lession_id 
        )
        await self.create_notification(notification_create=notification_create)
        return None
