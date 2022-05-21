from exception.http_exception import RequestException
from connections.mongo_connector import get_repo
from model import AccountResponse, Account
from utils.model_utils import to_response_dto, get_dict
from connections.config import USER_COLLECTION


class AdminService:
    def __init__(self):
        self.user_repo = get_repo(Account, USER_COLLECTION)

    async def get_one_user(self, uv_id):
        res = await self.user_repo.get_one_by_id(uv_id)
        if not res:
            raise RequestException(message="User does not exist")
        doc_id, uv = res
        return to_response_dto(doc_id, uv, AccountResponse)

    async def get_all_user(self):
        res = []
        users = await self.user_repo.get_all()
        for doc_id, uv in users.items():
            res.append(to_response_dto(doc_id, uv, AccountResponse))
        return res
