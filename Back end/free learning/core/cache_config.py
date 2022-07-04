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

    def set(self, key: Any, value: Any):
        data = pickle.dumps(value)
        self.__redis.setex(key, self.__time_to_live, data)

    def get(self, key: Any):
        try:
            return pickle.loads(self.__redis.get(key))
        except:
            raise Exception()

    def append(self, key: Any, sub_key: Any, value: Any):
        try:
            self.__redis.append(key, {
                sub_key: value
            })
        except:
            self.set(key, value={
                sub_key:value
            })
    
    def remove(self, key: Any):
        try:
            self.__redis.delete(key)
        except:
            pass

    def update(self, key: Any):
        for sub_key in self.get(key).keys():
            print(sub_key)       

    def exists(self, key: Any):
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

__cache = Cache()
__cache.clear()

def cache(*_args, **_kargs):
    def decorator(function):
        async def wrapper(self, *args, **kargs):
            key = str(function.__name__)
            sub_key = pickle.dumps([args, kargs])
            pprint(__cache.get_keys())
            try:
                res = __cache.get(key)[sub_key]
                return res
            except:
                res = await function(self, *args, **kargs)
                try:
                    __cache.append(key, sub_key, res)
                except:
                    pass
                return res
        return wrapper
    return decorator

def cache_update(*_args, **_kargs):
    def decorator(function):
        async def wrapper(self, *args, **kargs):
            pprint(__cache.get_keys())
            res = await function(self, *args, **kargs)
            for key in _args:
                print(key)
                # __cache.update(key)
            pprint(__cache.get_keys())
            return res
        return wrapper
    return decorator