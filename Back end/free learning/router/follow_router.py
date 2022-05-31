from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from core.model import HttpResponse, custom_response, success_response
from model.comment import CommentCreate
from router.user_router import oauth2_scheme
from service.follow_service import FollowService
from core.api_config import CommentAPI, FollowAPI
from utils.router_utils import get_actor_from_request

router = APIRouter()


@router.post(FollowAPI.SUBCRIBE, response_model=HttpResponse)
async def subcribe(
    publisher: str,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    result = await FollowService().subcribe(subcriber=username, publisher=publisher)
    return custom_response(**result)


@router.post(FollowAPI.GET_FOLLOWERS, response_model=HttpResponse)
async def get_followers(
    username: str,
):
    result = await FollowService().get_followers(username=username)
    return success_response(data=result)

@router.post(FollowAPI.GET_MIN_FOLLOWERS, response_model=HttpResponse)
async def get_followers(
    username: str,
):
    result = await FollowService().get_min_followers(username=username)
    return success_response(data=result)

@router.post(CommentAPI.CREATE_COMMENT, response_model=HttpResponse)
async def create_comment(
    comment_create: CommentCreate,
    token: str = Depends(oauth2_scheme),
    username: str = Depends(get_actor_from_request),
):
    comment_create.at_username = username
    result = await FollowService().create_comment(comment_create=comment_create)
    return success_response(data=result)

@router.post(CommentAPI.GET_COMMENTS, response_model=HttpResponse)
async def create_comment(
    blog_id: str,
):
    result = await FollowService().get_comments(blog_id=blog_id)
    return success_response(data=result)