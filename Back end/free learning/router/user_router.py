from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

from core.model import HttpResponse, success_response
from model import AccountCreate
from service.user_service import AccountService
from core.api_config import UserAPI

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=UserAPI.LOGIN)


class LoginForm(BaseModel):
    username: str = "admin"
    password: str = "admin"
    
def get_actor_from_request(request: Request):
    try:
        return request._headers['x-request-user']
    except:
        return None

@router.post(UserAPI.LOGIN)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    result = await AccountService().authenticate_user(
        form_data.username, form_data.password
    )
    return {"token_type": result.token_type, "access_token": result.token}

@router.post(UserAPI.REGISTER, response_model=HttpResponse)
async def register(account_create: AccountCreate):
    result = await AccountService().create_one_account(account_create)
    return success_response(data=result)

