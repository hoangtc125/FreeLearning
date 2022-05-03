from typing import Optional
from pydantic import BaseModel

class Follow(BaseModel):
  followers: list = []


class FollowResponse(Follow):
  id: str