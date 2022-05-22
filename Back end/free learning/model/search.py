from typing import Optional
from pydantic import BaseModel, validator
from exception.http_exception import CredentialException

from model.course import Course
from model.lession import Lession


class Search(BaseModel):
    search_type: Optional[str]
    key_word: Optional[str] = None
    
    @validator('search_type', pre=True, always=True)
    def validate_search_type(cls, input):
        if input in ['user', 'lession', 'course']:
            return input
        else:
            raise CredentialException(
                message="Invalid SEARCH_TYPE"
            )

class SearchResult(BaseModel):
    search_type: str
    result: list


class SearchResponse(Search):
    process_time: float = 0
    results: list


class SearchAccount(BaseModel):
    username: str
    fullname: str
    avatar: Optional[str] = None
    role: str
    phone: Optional[str] = None
    email: str


class SearchToken(BaseModel):
    token_type: str
    token: str


class SearchCourse(Course):
    pass


class LessionSearch(Lession):
    pass