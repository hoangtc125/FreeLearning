from typing import Optional
from pydantic import BaseModel


class Search(BaseModel):
    search_type: Optional[str] = None
    key_word: str


class SearchResult(BaseModel):
    search_type: str
    result: list


class SearchResponse(Search):
    process_time: float = 0
    results: list


class SearchAccount(BaseModel):
    username: str
    fullname: str
    avatar: str
    role: str


class SearchToken(BaseModel):
    token_type: str
    token: str
