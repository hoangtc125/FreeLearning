from pydantic import BaseModel


class Form_data(BaseModel):
    username: str = ("string",)
    password: str = ("string",)
