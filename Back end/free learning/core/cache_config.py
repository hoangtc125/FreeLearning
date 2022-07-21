import sys
import redis
import pickle
import inspect
from copy import deepcopy
from typing import Any
from pprint import pprint

from core.project_config import settings

class Cache:

    model_mapping = {}
    function_mapping = {}
    chain = {}

    def __init__(self, 
        host: str = "localhost",
        port: int = 6379,
        maxmemory: str = "500M",
        policy: str = "allkeys-lru",
        time_to_live: int = 60 * 60 * 24):

        self.__redis = redis.Redis(host=host, port=port)
        self.__redis.config_set("maxmemory", maxmemory)
        self.__redis.config_set("maxmemory-policy", policy)
        self.__time_to_live = time_to_live
        
    def set(self, key: Any, value: Any):
        data = pickle.dumps(value)
        self.__redis.setex(key, self.__time_to_live, data)

    def get(self, key: str):
        try:
            return pickle.loads(self.__redis.get(key))
        except:
            raise Exception()

    def append(self, key: Any, value: Any):
        try:
            self.__redis.append(key, value)
        except:
            self.set(key, value)
    
    def remove(self, key: Any):
        try:
            self.__redis.delete(key)
        except:
            pass

    async def update(self, service_self: Any, model: str):
        try:
            for function in Cache.model_mapping[model]:
                for params in Cache.function_mapping[function.__name__]:
                    args, kargs = params
                    res = await function(service_self, *deepcopy(args), **deepcopy(kargs))
                    key = str(model) + str(function.__name__) + str(args) + str(kargs)
                    self.set(key, res)
        except:
            pass

    def delete(self, model: str):
        try:
            for function in Cache.model_mapping[model]:
                for chain_function in Cache.chain[function.__name__]:
                    chain_keys = [k.decode("utf-8")  for k in self.get_keys() if chain_function in k.decode("utf-8")]
                    for key in chain_keys:
                        try:
                            self.remove(key)
                        except:
                            pass
            Cache.model_mapping.pop(model)
            pprint(__cache.get_keys())
        except:
            pass

    def is_exist(self, key: Any):
        return self.__redis.exists(key)

    def get_keys(self):
        return self.__redis.keys()

    def clear(self):
        self.__redis.flushdb()

    def get_current_memory(self):
        return self.__redis.info()['used_memory']

    def get_info(self):
        return self.__redis.info()

    @staticmethod
    def set_model_mapping(models, function):
        for model in models:
            if model not in Cache.model_mapping.keys():
                Cache.model_mapping[model] = [function]
            elif function not in Cache.model_mapping[model]:
                Cache.model_mapping[model].append(function)

    @staticmethod
    def set_function_mapping(function, params):
        if function not in Cache.function_mapping.keys():
            Cache.function_mapping[function] = [params]
        elif params not in Cache.function_mapping[function]:
            Cache.function_mapping[function].append(params)

    @staticmethod
    def set_chain(function, callers):
        callers.append(function)
        if function not in Cache.chain.keys():
            Cache.chain[function] = callers
        else:
            Cache.chain[function].extend([v for v in callers if v not in Cache.chain[function]]) 

__cache = Cache()
__cache.clear()

def cache(*_args, reloaded_by = [], **_kargs):
    def decorator(function):
        async def wrapper(self: Any = None, *args, **kargs):
            models = [str(model.__name__).lower() for model in reloaded_by]
            callers = list(set([f.function for f in inspect.stack() if settings.BACKEND_NAME in f.filename]))
            if 'wrapper' in callers:
                callers.remove('wrapper')
            Cache.set_model_mapping(models=models, function=function)
            Cache.set_function_mapping(function=function.__name__, params=(args, kargs))
            Cache.set_chain(function.__name__, callers)
            key = str(function.__name__) + str(args) + str(kargs)
            try:
                res = __cache.get(key)
            except:
                print('cache-miss')
                res = await function(self, *deepcopy(args), **deepcopy(kargs))
                __cache.set(key, res)
            return res
        return wrapper
    return decorator

def cache_update(function):
    async def wrapper(self, *args, **kargs):
        res = await function(self, *args, **kargs)
        await __cache.update(service_self=self, model=self.idx_name)
        return res
    return wrapper

def cache_delete(function):
    async def wrapper(self, *args, **kargs):
        res = await function(self, *args, **kargs)
        __cache.delete(model=self.idx_name)
        return res
    return wrapper
