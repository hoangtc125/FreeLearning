from typing import TypeVar
from pydantic import BaseModel

T = TypeVar("T")
Src = TypeVar("Src")

def get_dict(object: T, allow_none=False) -> dict:
  res = {}
  data = object if type(object) is dict else object.__dict__
  for key, value in data.items():
    if value == None and allow_none == False:
      continue
    if isinstance(value, BaseModel):
      res[key] = get_dict(value)
    elif type(value) is not dict:
      res[key] = value
    elif len(value.keys()) == 0:
      continue
    else:
      res[key] = get_dict(value, allow_none)
  return res

def get_mongo_response_model(response, target_class: T) -> T:
  resp_obj = target_class(**response)
  return resp_obj


def to_response_dto(_id: str, src: Src, target: T) -> T:
  return target(id=_id, **get_dict(src, allow_none=True))


if __name__ == "__main__":
  pass
