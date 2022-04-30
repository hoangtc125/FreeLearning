from fastapi import HTTPException, status


class CredentialException(HTTPException):
  def __init__(
    self,
    message,
    headers={"WWW-Authenticate": "Bearer"},
    status_code=status.HTTP_401_UNAUTHORIZED,
  ):
    CredentialException.detail = message
    CredentialException.headers = headers
    CredentialException.status_code = status_code


class PermissionDeniedException(HTTPException):
  def __init__(
    self,
    message,
    headers={"WWW-Authenticate": "Bearer"},
    status_code=status.HTTP_403_FORBIDDEN,
  ):
    PermissionDeniedException.detail = message,
    PermissionDeniedException.headers = headers
    PermissionDeniedException.status_code = status_code


class RequestException(HTTPException):
  def __init__(
    self,
    message,
    headers={"WWW-Authenticate": "Bearer"},
    status_code=status.HTTP_400_BAD_REQUEST,
  ):
    RequestException.detail = message,
    RequestException.headers = headers
    RequestException.status_code = status_code


class UnprocessableEntityException(HTTPException):
  def __init__(
    self,
    message,
    headers={"WWW-Authenticate": "Bearer"},
    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
  ):
    UnprocessableEntityException.detail = message,
    UnprocessableEntityException.headers = headers
    UnprocessableEntityException.status_code = status_code
