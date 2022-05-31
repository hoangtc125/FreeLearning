from random import randint
from typing import Union
import uuid
import starlette
from core.constants import Role
from exception.http_exception import CredentialException, UnprocessableEntityException
from connections.mongo_connector import get_repo
from core.model import TokenPayload
from model import (
    Account,
    AccountUpdate,
    AccountCreate,
    AccountResponse,
    ConfirmationToken,
)
from model.user import PasswordUpdate
from utils.jwt_utils import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    get_hashed_password,
    verify_password,
)
from utils.mail_utils import send_mail
from utils.model_utils import get_dict, to_response_dto
from core.project_config import settings
from utils.time_utils import get_current_timestamp, get_timestamp_after
from connections.config import USER_COLLECTION, TOKEN_COLLECTION


class AccountService:

    ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

    def __init__(self):
        self.account_repo = get_repo(Account, USER_COLLECTION)
        self.token_repo = get_repo(ConfirmationToken, TOKEN_COLLECTION)

    @staticmethod
    def validate_account(account: Union[Account, AccountCreate, AccountUpdate]):
        # validate role
        if account.role not in Role.__dict__.keys():
            raise Exception("Unsupport Role")

    async def get_account_by_id(self, id: str):
        res = await self.account_repo.get_one_by_id(doc_id=uuid.UUID(id))
        if not res:
            raise UnprocessableEntityException(message="Not found user")
        id, account = res
        return to_response_dto(id, account, AccountResponse)

    async def get_account_by_field(self, field="username", value=None):
        res = await self.account_repo.get_one_by_field(field=field, value=value)
        if not res:
            return None
        id, account = res
        return to_response_dto(id, account, AccountResponse)

    async def get_token_by_username(self, username):
        res = await self.token_repo.get_one_by_id(username)
        if not res:
            return None
        id, token = res
        return to_response_dto(id, token, ConfirmationToken)

    async def create_one_account(self, account_create: AccountCreate, actor=None):
        _account = await self.get_account_by_field(field="username", value=account_create.username)
        if _account:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Account already exists",
            )
        hashed_password = get_hashed_password(account_create.password)
        account = Account(
            hashed_password=hashed_password, **get_dict(account_create, allow_none=True)
        )
        try:
            self.validate_account(account)
        except Exception as e:
            raise UnprocessableEntityException(message=str(e))
        account_id = await self.account_repo.insert_one(obj=account)
        return to_response_dto(account_id, account, AccountResponse)

    async def update_one_account(self, account_update: AccountUpdate, actor=None):
        _account = await self.get_account_by_field(field="username", value=account_update.username)
        if not _account:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Account doesn't exist",
            )
        try:
            self.validate_account(account_update)
        except Exception as e:
            raise UnprocessableEntityException(message=str(e))
        for key, value in account_update.__dict__.items():
            if key == "role":
                continue
            setattr(_account, "{}".format(key), value)
        account = Account(**get_dict(_account))
        account_id = await self.account_repo.update(
            doc_id=uuid.UUID(_account.id), obj=account
        )
        return to_response_dto(account_id, account_update, AccountUpdate)

    async def update_password(self, password_update: PasswordUpdate, username: str):
        account = await self.get_account_by_field(field="username", value=username)
        if not account:
            raise CredentialException(message="UNAUTHORIZED")
        if not verify_password(password_update.old_password, account.hashed_password):
            raise CredentialException(message="Old password miss matching")
        hashed_password = get_hashed_password(password_update.new_password)
        await self.account_repo.update_one_by_field(
            doc_id=uuid.UUID(account.id), field="hashed_password", value=hashed_password
        )
        return None

    async def forgot_password(self, email: str):
        account = await self.get_account_by_field(field="email", value=email)
        if not account:
            raise CredentialException(message="UNAUTHORIZED your email")

        new_password = str(randint(1e8, 1e9))
        print(new_password)
        hashed_new_password = get_hashed_password(new_password)
        try:
            await self.account_repo.update_one_by_field(
                doc_id=uuid.UUID(account.id), field="hashed_password", value=hashed_new_password
            )
        except:
            raise CredentialException(message="Can't update new password")
        return send_mail(
            receiver=account.email,
            message=new_password,
            subject="Update your new password in Free Learning VN"
        )

    async def authenticate_user(self, username: str, password: str):
        account = await self.get_account_by_field(field="username", value=username)
        if not account:
            raise CredentialException(message="UNAUTHORIZED")
        if not verify_password(password, account.hashed_password):
            raise CredentialException(message="UNAUTHORIZED")
        expire_time = get_timestamp_after(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        confirmation_token = create_access_token(
            TokenPayload(username=username, role=account.role, expire_time=expire_time)
        )
        token = await self.get_token_by_username(username)
        if not token:
            await self.token_repo.insert_one(obj=confirmation_token, custom_id=username)
        elif token.expires_at > get_current_timestamp():
            return (token, account.avatar, account.id)
        else:
            await self.token_repo.update(doc_id=username, obj=confirmation_token)
        return (confirmation_token, account.avatar, account.id)
