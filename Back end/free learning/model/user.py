from typing import Optional
from pydantic import BaseModel
from core.constants import Role

class BaseAccount(BaseModel):
  username: Optional[str] = None
  phone: Optional[str] = None
  fullname: str
  email: str
  avatar: Optional[str] = None
  role: Optional[str] = Role.STUDENT
  profile: Optional[dict] = {}


class Account(BaseAccount):
  _id: str
  hashed_password: str
  is_disabled: Optional[bool] = False


class AccountCreate(BaseAccount, BaseModel):
  password: str


class AccountUpdate(BaseAccount):
  username = None

  @property
  def username(self):
    raise AttributeError("'AccountUpdate' object has no attribute 'username'")


class AccountResponse(Account):
  id: str


if __name__ == "__main__":
    temp = BaseAccount(
      username="1111", fullname="string"
    )
    print(temp.__dict__)
    
