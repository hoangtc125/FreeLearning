from typing import Optional
from pydantic import BaseModel
from core.constants import Category
from core.model import NewItem


class Lession(NewItem, BaseModel):
    content: str
    name: str
    description: str
    is_approved: Optional[bool] = False
    at_course_id: Optional[str] = None
    at_username: Optional[str] = None
    course_type: str = Category.FREE


class LessionCreate(Lession):
    pass


class LessionUpdate(Lession):
    id: str


class LessionResponse(Lession):
    id: str


if __name__ == "__main__":
    pass
