import redis
import time
from typing import Any
import pickle

from pprint import pprint
from core.project_config import settings

class Cache:
    def __init__(self):
        self.__redis = redis.Redis(host="localhost", port=6379)
        self.__redis.config_set("maxmemory", "50M")
        self.__redis.config_set("maxmemory-policy", "allkeys-lru")
        self.__time_to_live = settings.CACHE_TIME_TO_LIVE

    def set(self, key: str, value: Any):
        data = pickle.dumps(value)
        self.__redis.setex(key, self.__time_to_live, data)

    def get(self, key: str):
        try:
            return pickle.loads(self.__redis.get(key))
        except:
            raise Exception()

    def exists(self, key: str):
        return self.__redis.exists(key)

    def get_keys(self):
        return self.__redis.keys()

    def sleep(self, second: int):
        time.sleep(second)

    def clear(self):
        self.__redis.flushdb()

    def get_current_memory(self):
        return self.__redis.info()['used_memory']

    def get_info(self):
        return self.__redis.info()

cache = Cache()
cache.clear()

def caching(function):
    async def wrapper(self, *args, **kargs):
        key = str(args)+str(kargs)
        pprint(cache.get_keys())
        try:
            print("cache-hit", cache.get_current_memory())
            return cache.get(key)
        except:
            print("cache-miss", cache.get_current_memory())
            res = await function(self, *args, **kargs)
            try:
                cache.set(key, res)
                pprint(cache.get_keys())
            except:
                pass
            return res
    return wrapper