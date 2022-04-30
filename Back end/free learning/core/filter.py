from typing import Tuple

from fastapi import Request

from utils.jwt_utils import get_token_payload
from core.api_config import API_PERMISSION, ALLOW_ALL
from exception.http_exception import PermissionDeniedException
from core.model import TokenPayload

def authorize_token(request: Request):
  request_username = "unknown"
  request_role = "unknown"
  request_user = TokenPayload(username=request_username, role=request_role)
  try:
    access_token = request.headers["authorization"]
    if "Bearer" not in access_token:
      return request_user
    token = access_token.split(" ")[1]
    request_user = get_token_payload(token)
    request_role = request_user.role

    request_username = request_user.username
  except KeyError as e:
    pass
  request_username_header: Tuple[bytes] = ("x-request-user".encode(), request_username.encode())
  request_role_header: Tuple[bytes] = ("x-request-role".encode(), request_role.encode())
  request.headers.__dict__["_list"].append(request_username_header) # pylint: disable=W0212
  request.headers.__dict__["_list"].append(request_role_header) # pylint: disable=W0212
  return request_user

def check_api_permission(path, request_role=None):
  if path not in API_PERMISSION:
    return
  accepted_role = API_PERMISSION[path]
  if accepted_role == ALLOW_ALL or request_role in accepted_role:
    return
  raise PermissionDeniedException(
    "You are not allowed to access this API"
  )
