from pydantic import BaseModel
from pydantic import validator
from datetime import datetime
from typing import Any, Optional, TypeVar, Generic, List

T = TypeVar("T")


class HttpResponse(BaseModel):

    status_code: str = "200"
    msg: str = "Success"
    data: Optional[T] = None


class PaginationModel(BaseModel):

    max_page: int
    current_page: int
    data: List[T]


class TokenPayload(BaseModel):

    username: Optional[str] = None
    role: Optional[str] = None
    expire_time: Optional[int] = None


class NewItem(BaseModel):
    created_at: Optional[int] = int(datetime.utcnow().timestamp())
    modified_at: Optional[int] = int(datetime.utcnow().timestamp())
    number_of_views: Optional[int] = 0


class MongoDBFilter(BaseModel):

    field: str
    match: Optional[Any] = None
    lte: Optional[Any] = None
    gte: Optional[Any] = None

    @validator("match")
    def validate(cls, values, **kwargs):
        if values["match"] == None and values["lte"] == None and values["gte"] == None:
            raise ValueError("Invalid filter")


def custom_response(status_code: str, message: str, data: T) -> HttpResponse:
    return HttpResponse(status_code=status_code, msg=message, data=data)


def success_response(data=None):
    return HttpResponse(status_code="200", msg="Sucess", data=data)


if __name__ == "__main__":
    pass
