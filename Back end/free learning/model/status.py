from typing import Optional
from pydantic import BaseModel
from core.constants import Category
from core.model import NewItem


class Status(NewItem, BaseModel):
    content: str
    user_id: str
    image: Optional[str] = None


class StatusCreate(Status):
    pass


class StatusUpdate(Status):
    id: str


class StatusResponse(Status):
    id: str


if __name__ == "__main__":
    pass
