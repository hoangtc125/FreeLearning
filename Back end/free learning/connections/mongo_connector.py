from typing import Any, List, Optional, TypeVar, Dict
from uuid import uuid4
import json
import uuid

from utils.model_utils import get_dict, get_mongo_response_model
from core.project_config import settings
from core.model import PaginationModel
from core.cache_config import cache_delete

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
        return (str(resp["_id"]), self.model(**resp["_source"]))

    async def get_all(self, filter: Optional[dict] = None):
        resp = []
        async for item in self.mongo_connector.find(filter if filter else {}):
            item["_id"] = str(item["_id"])
            resp.append(item)
        res = {}
        for item in resp:
            res[item["_id"]] = get_mongo_response_model(item["_source"], self.model)
        return res

    async def get_page(self, page, size, filter: Optional[dict] = None):
        pass
    
    @cache_delete
    async def insert_one(self, obj: T, custom_id=None):
        if obj.__class__ != self.model:
            raise TypeError(
                f"{obj.__class__} can not be inserted into {self.model.__class__}"
            )
        doc_id = custom_id if custom_id else uuid4()
        mongo_resp = await self.mongo_connector.insert_one(
            {"_id": doc_id, "_source": get_dict(obj)}
        )
        return str(doc_id)

    @cache_delete
    async def delete(self, _id):
        resp = await self.mongo_connector.delete_one({"_id": _id})
        return resp

    @cache_delete
    async def update(self, doc_id, obj):
        if obj.__class__ != self.model:
            raise TypeError(
                f"{obj.__class__} can not be inserted into {self.model.__class__}"
            )
        resp = await self.mongo_connector.update_one(
            {"_id": doc_id}, {"$set": {"_source": get_dict(obj)}}
        )
        return str(doc_id)

    async def get_one_by_field(self, field, value):
        try:
            resp = await self.mongo_connector.find_one(
                {"_source.{}".format(field): value}
            )
            if not resp:
                return None
        except Exception:
            return None
        return (str(resp["_id"]), self.model(**resp["_source"]))

    @cache_delete
    async def update_one_by_field(self, doc_id, field, value):
        try:
            resp = await self.mongo_connector.update_one(
                {"_id": doc_id}, {"$set": {"_source.{}".format(field): value}}
            )
            if not resp:
                return None
        except Exception:
            return None
        return None


def get_repo(model: T, connection) -> MongoRepo:
    if not mongo_monitor.get(model.__name__, None):
        mongo_monitor[model.__name__] = MongoRepo(model, connection)
    return mongo_monitor[model.__name__]


if __name__ == "__main__":
    pass
