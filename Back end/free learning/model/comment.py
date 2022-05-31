from typing import Optional
from pydantic import BaseModel
from utils.time_utils import get_current_timestamp


class Comment(BaseModel):
    created_at: int = get_current_timestamp()
    content: str
    at_blog: str
    at_username: str
    user_id: Optional[str] = None
    avatar: Optional[str] = None
    fullname: Optional[str] = None


class CommentCreate(Comment):
    pass

class CommentResponse(Comment):
    id: str
