from typing import Optional
from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

from core.model import HttpResponse, success_response
from model import AccountCreate
from model.course import CourseCreate, CourseUpdate
from model.lession import LessionCreate, LessionUpdate
from model.user import AccountUpdate, PasswordUpdate
from service.business_service import BusinessService
from service.user_service import AccountService
from core.api_config import UserAPI
from utils.router_utils import get_actor_from_request
from core.log_config import logger
from service.follow_service import FollowService

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=UserAPI.LOGIN)


class LoginForm(BaseModel):
    username: str = "admin"
    password: str = "admin"


@router.post(UserAPI.LOGIN)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    result, avatar, id = await AccountService().authenticate_user(
        form_data.username, form_data.password
    )
    logger.log(result, "avatar")
    return {"token_type": result.token_type, "access_token": result.token, "avatar": avatar, "id": id}


@router.post(UserAPI.REGISTER, response_model=HttpResponse)
async def register(account_create: AccountCreate):
    logger.log(account_create)
    result = await AccountService().create_one_account(account_create)
    return success_response(data=result)


@router.post(UserAPI.FIND_ONE, response_model=HttpResponse)
async def find_one(
    id: str,
):  
    logger.log(id)
    result = await AccountService().get_account_by_id(id=id)
    fls = await FollowService().get_min_followers(username=result.username)
    return success_response(data=[result, fls])


@router.post(UserAPI.PROFILE, response_model=HttpResponse)
async def profile(
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    logger.log(token, username)
    result = await AccountService().get_account_by_field(field="username", value=username)
    fls = await FollowService().get_min_followers(username=username)
    return success_response(data=[result, fls])


@router.put(UserAPI.UPDATE_PROFILE, response_model=HttpResponse)
async def update_profile(
    account_update: AccountUpdate,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    setattr(account_update, "username", username)
    result = await AccountService().update_one_account(account_update)
    return success_response(data=result)


@router.put(UserAPI.UPDATE_PASSWORD, response_model=HttpResponse)
async def update_password(
    password_update: PasswordUpdate,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    result = await AccountService().update_password(password_update, username)
    return success_response(data=result)

@router.post(UserAPI.FORGOT_PASSWORD, response_model=HttpResponse)
async def forgot_password(
    email:str
):
    result = await AccountService().forgot_password(email)
    return success_response(data=result)

@router.post(UserAPI.GET_ALL_COURSES, response_model=HttpResponse)
async def get_all_courses(
    username: str
):
    result = await BusinessService().get_all_courses(username=username)
    return success_response(data=result)

@router.post(UserAPI.GET_ALL_LESSIONS, response_model=HttpResponse)
async def get_all_lessions(
    username: str
):
    result = await BusinessService().get_all_lessions(username=username)
    return success_response(data=result)

@router.post(UserAPI.CREATE_COURSE, response_model=HttpResponse)
async def create_course(
    course: CourseCreate,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    result = await BusinessService().create_course(username=username, course=course)
    return success_response(data=result)

@router.post(UserAPI.GET_ONE_COURSE, response_model=HttpResponse)
async def get_one_course(
    course_id: str
):
    result = await BusinessService().get_one_course_by_id(doc_id=course_id)
    return success_response(data=result)

@router.put(UserAPI.UPDATE_COURSE, response_model=HttpResponse)
async def update_course(
    course: CourseUpdate,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    result = await BusinessService().update_course(username=username, course=course)
    return success_response(data=result)

@router.delete(UserAPI.DELETE_ONE_COURSE, response_model=HttpResponse)
async def delete_course(
    course_id: str,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    result = await BusinessService().delete_one_course(username=username, course_id=course_id)
    return success_response(data=result)

@router.post(UserAPI.CREATE_LESSION, response_model=HttpResponse)
async def create_lession(
    lession: LessionCreate,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    result = await BusinessService().create_lession(username=username, lession=lession)
    return success_response(data=result)

@router.post(UserAPI.GET_ONE_LESSION, response_model=HttpResponse)
async def get_one_lession(
    lession_id: str
):
    result = await BusinessService().get_one_lession_by_id(doc_id=lession_id)
    return success_response(data=result)

@router.put(UserAPI.UPDATE_LESSION, response_model=HttpResponse)
async def update_lession(
    lession: LessionUpdate,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    result = await BusinessService().update_lession(username=username, lession=lession)
    return success_response(data=result)

@router.delete(UserAPI.DELETE_ONE_LESSION, response_model=HttpResponse)
async def delete_lession(
    lession_id: str,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    result = await BusinessService().delete_one_lession(username=username, lession_id=lession_id)
    return success_response(data=result)