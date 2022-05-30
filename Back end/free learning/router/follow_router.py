from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from core.model import HttpResponse, custom_response, success_response
from model.follow import Follow
from router.user_router import oauth2_scheme
from service.follow_service import FollowService
from core.api_config import FollowAPI
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
