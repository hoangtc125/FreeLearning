from typing import Optional
from fastapi import APIRouter, Depends

from core.model import success_response
from service.admin_service import AdminService
from router.user_router import oauth2_scheme
from core.api_config import AdminAPI

router = APIRouter()


@router.post(AdminAPI.GET_ALL_USER)
async def get_all(token: str = Depends(oauth2_scheme)):
  result = await AdminService().get_all_user()
  return success_response(data=result)
