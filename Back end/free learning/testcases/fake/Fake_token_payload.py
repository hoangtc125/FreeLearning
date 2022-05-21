from pydantic import BaseModel


class Token_payload(BaseModel):
    username: str = "string"
