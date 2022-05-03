from email import message
from exception.http_exception import RequestException
from connections.mongo_connector import get_repo
from model.follow import Follow, FollowResponse
from model.user import Account
from utils.model_utils import get_dict, to_response_dto
from connections.config import FOLLOW_COLLECTION, USER_COLLECTION
from service.user_service import AccountService

class FollowService:

  def __init__(self):
    self.account_repo = get_repo(Account, USER_COLLECTION)
    self.follow_repo = get_repo(Follow, FOLLOW_COLLECTION)

  async def subcribe(self, subcriber: str, publisher: str):
    if subcriber == publisher:
      raise RequestException(
        message="Can't follow yourself"
      )
    _publisher = await AccountService().get_account_by_username(username=publisher)
    if not _publisher:
      raise RequestException(
        message="Publisher doesn't exist"
      )
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
      await self.follow_repo.update_one_by_field(doc_id=doc_id, field="followers", value=list_fl)
    return {
      'status_code': "200", 
      'message': message, 
      'data': {'_id':publisher, 'followers': list_fl}
    }
    
  async def get_followers(self, username: str):
    _account = await AccountService().get_account_by_username(username=username)
    if not _account:
      raise RequestException(
        message="Account doesn't exist"
      )
    res = await self.follow_repo.get_one_by_id(doc_id=username)
    if not res:
      raise RequestException(
        message="User does not exist"
      )
    doc_id, fl = res
    return to_response_dto(doc_id, fl, FollowResponse)

    
