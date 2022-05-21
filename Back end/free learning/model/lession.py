from typing import Optional
from pydantic import BaseModel
from core.constants import Category
from core.model import NewItem


class Lession(NewItem, BaseModel):
    content: str
    name: str
    description: str
    is_approved: bool
    at_course_id: str
    at_username: str
    course_type: str = Category.FREE


class LessionCreate(Lession):
    pass


class LessionUpdate(Lession):
    id: str


class LessionResponse(Lession):
    id: str


if __name__ == "__main__":
    pass
