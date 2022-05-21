from typing import Optional
from pydantic import BaseModel
from core.constants import Category
from core.model import NewItem



class Course(NewItem, BaseModel):
    course_type: str = Category.FREE
    name: str
    description: str
    at_username: str

class CourseCreate(Course, BaseModel):
    pass


class CourseUpdate(Course, BaseModel):
    id: str


class CourseResponse(Course):
    id: str

if __name__ == "__main__":
    pass
