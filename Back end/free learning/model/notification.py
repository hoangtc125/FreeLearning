from typing import Optional
from pydantic import BaseModel
from utils.time_utils import get_current_timestamp


class Notification(BaseModel):
    created_at: int = get_current_timestamp()
    content: str
    user_id: str
    href: Optional[str] = None
    is_read: Optional[bool] = False


class NotificationCreate(Notification):
    pass


class NotificationResponse(Notification):
    id: str
