from datetime import datetime
from passlib.context import CryptContext
from exception.http_exception import CredentialException
from model import ConfirmationToken
from jose import JWTError, jwt
from core import settings
from core.model import TokenPayload
from utils.time_utils import (
    get_current_timestamp,
    get_timestamp_after
)
from utils.model_utils import get_dict


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.SECURITY_ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

def verify_password(plain_password, hashed_password):
  return pwd_context.verify(plain_password, hashed_password)


def get_hashed_password(password):
  return pwd_context.hash(password)


def create_access_token(data: TokenPayload) -> ConfirmationToken:
  to_encode = get_dict(data)
  token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return ConfirmationToken(
    token=token, created_at=get_current_timestamp(), expires_at=data.expire_time
  )


def get_token_payload(token: str):
  try:
    payload_data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    token_payload = TokenPayload(**payload_data)
    username: str = token_payload.username
    expire = token_payload.expire_time
    expire = datetime.fromtimestamp(expire)
    if username is None:
      raise CredentialException(message="Could not validate credentials")
    if expire < datetime.utcnow():
      raise CredentialException(message="Expired token")
  except JWTError:
    raise CredentialException(message="Could not validate credentials")
  return token_payload


if __name__ == "__main__":
  print(get_hashed_password("admin"), get_hashed_password("admin"))
