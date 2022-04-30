from pydantic import BaseModel

class ConfirmationToken(BaseModel):
  token_type: str = "Bearer"
  token: str
  created_at: int
  expires_at: int
