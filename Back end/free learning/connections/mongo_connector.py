from typing import (
    Any,
    List,
    Optional,
    TypeVar,
    Dict)
from uuid import uuid4
import json

from utils.model_utils import (
    get_dict,
    get_mongo_response_model
)
from core.project_config import settings
from core.model import PaginationModel
from utils.user_utils import to_response_dict_user

__author__ = "Manh Truong"
__copyright__ = "Copyright 2022, Techpro SDX"
__credits__ = ["Manh Truong", "Duong Nguyen Dinh", "Dung Nguyen"]
__contact__ = "truong.bui@techpro-sdx.com.vn"
__maintainer__ = []
__version__ = "1.0.0"

T = TypeVar("T")
mongo_monitor = {}

class MongoRepo:

  def __init__(self, model: T, connection):
    self.mongo_connector = connection
    self.model = model
    self.idx_name = model.__name__.lower()

  async def get_one_by_id(self, doc_id):
    try:
      resp = await self.mongo_connector.find_one({"_id": doc_id})
      if not resp:
        return None
    except Exception:
      return None
    return (resp["_id"], self.model(**resp["_source"]))

  async def get_all(self, filter: Optional[dict] = None):
    if filter:
      raise Exception("Don't support filter")
    resp = []
    async for item in self.mongo_connector.find():
      item["_id"] = str(item["_id"])
      resp.append(item)
    res = {}
    for item in resp:
      res[item["_id"]] = get_mongo_response_model(item["_source"], self.model)
    return res

  async def get_page(self, page, size, filter: Optional[dict] = None):
    pass


  async def insert_one(self, obj: T, custom_id=None):
    if obj.__class__ != self.model:
      raise TypeError(
        f"{obj.__class__} can not be inserted into {self.model.__class__}"
      )
    doc_id = custom_id if custom_id else uuid4()
    mongo_resp = await self.mongo_connector.insert_one({"_id":doc_id, "_source":get_dict(obj)})
    return str(doc_id)

  async def delete(self, _id):
    resp = await self.mongo_connector.delete(index=self.idx_name, id=_id)
    return resp

  async def update(self, doc_id, obj):
    if obj.__class__ != self.model:
        raise TypeError(
          f"{obj.__name__} can not be inserted into {self.model.__name__}"
        )
    resp = await self.mongo_connector.update_one(
      {"_id": doc_id}, {"$set": {"_source": get_dict(obj)}}
    )
    return str(doc_id)

  async def get_one_by_field(self, field, value):
    try:
      resp = await self.mongo_connector.find_one({"_source.{}".format(field): value})
      if not resp:
        return None
    except Exception:
      return None
    return (str(resp["_id"]), self.model(**resp["_source"]))


def get_repo(model: T, connection) -> MongoRepo:
  if not mongo_monitor.get(model.__name__, None):
    mongo_monitor[model.__name__] = MongoRepo(model, connection)
  return mongo_monitor[model.__name__]


if __name__ == "__main__":
  pass
