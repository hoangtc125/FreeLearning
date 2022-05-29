import asyncio
from collections import deque
from datetime import datetime
from starlette.middleware.base import BaseHTTPMiddleware
import logging
from logging.handlers import TimedRotatingFileHandler
import os, sys
import threading
import traceback
from typing import Any
from core.project_config import LOG_DIR
from utils.time_utils import get_current_timestamp

class MyTimedRotatingFileHandler(TimedRotatingFileHandler):

    def __init__(self, file_name: str):
        self.__file_name = file_name
        self.create_dir()
        TimedRotatingFileHandler.__init__(self, self.__base_dir + "/" + self.__file_name + "_logging.ini", when='midnight', interval=1)
  
    def doRollover(self):
        self.stream.close()
        self.create_dir()
        self.stream = open(self.__base_dir, '+a')
        self.rolloverAt = self.rolloverAt + self.interval

    def create_dir(self):
        self.__base_dir = LOG_DIR + "/log/" + str(datetime.utcnow().date()).replace('-', '/')
        if not os.path.exists(self.__base_dir):
            os.makedirs(self.__base_dir)
        

def get_http_request_id(frame=sys._getframe(0), context = 1):
    lst = []
    while frame:
        lst.append(frame)
        if 'self' in frame.f_locals.keys() and isinstance(frame.f_locals['self'], BaseHTTPMiddleware):
            return id(frame.f_locals['scope'])
        frame = frame.f_back
    return 1


class Logger:

    routers = ['admin', 'follow', 'search', 'user']

    def __init__(self):
        loggers = {}
        loggers['stranger'] = Logger.create_file_handler('stranger')
        for router in Logger.routers:
            loggers[router] = Logger.create_file_handler(router)
        self.__loggers = loggers
        self.__pool = {}
        self.input_data_queue = deque()
        self.pool_locked = False
        self.deque_locked = False
        logger_thread = threading.Thread(target=self.__create_background_logger, args=())
        logger_thread.daemon = True
        logger_thread.start()


    def __create_background_logger(self):
        try:
            loop = asyncio.get_event_loop()
        except:
            loop = asyncio.new_event_loop()
        a = self.__log()
        loop.run_until_complete(asyncio.wait([a]))

    async def __log(self):
        print("create logging thread")
        while True:
            try:
                res = await self.__get_latest_data()
                if not res:
                    continue
                id, latest_data = res
                if latest_data['router'] not in Logger.routers:
                    self.__loggers['stranger'].info("\n".join(latest_data['message']))
                else: 
                    self.__loggers[latest_data['router']].info("\n".join(latest_data['message']))
            except Exception as e:
                traceback.print_exc()
    
    async def start(self, request: Any = None, request_user: Any = None):
        request_id = get_http_request_id(sys._getframe(0))
        print(request_id)
        message = ""
        if request_user:
            message += f"USER: {request_user.username}\n"
            message += f"ROLE: {request_user.role}\n"
        if request:
            message += f"REQUEST: method={request.method}, url={request.url}"
        await self.create_message(message, request_id=request_id)

    async def add_message(self, *messages):
        request_id = get_http_request_id(sys._getframe(0))
        print(request_id)
        await self.append_message(
            *messages,
            request_id=request_id,
        )

    async def end(self, path: str = None, response: Any = None):
        request_id = get_http_request_id(sys._getframe(0))
        print(request_id)
        message = ""
        if response:
            message += f"RESPONSE: status={response.status_code}, process_time={response.headers['X-Process-Time']}"
        else:
            message += "RESPONSE: None"
        message += "\n\n=================================================\n"
        router = path.split('/')[1]
        await self.remove_message(message, router, request_id=request_id)

    async def create_message(self, message, request_id):
        while not self.pool_locked:
            self.pool_locked = True
            self.__pool[request_id] = {}
            self.__pool[request_id]['message'] = [message]
            self.__pool[request_id]['created_at'] = get_current_timestamp()
            self.pool_locked = False
            return None

    async def append_message(self, *messages, request_id):
        while not self.pool_locked:
            self.pool_locked = True
            self.__pool[request_id]['message'].extend([str(msg) for msg in messages])
            self.pool_locked = False
            return None

    async def remove_message(self, message, router, request_id):
        while not self.pool_locked:
            self.pool_locked = True
            self.__pool[request_id]['message'].extend([message])
            self.__pool[request_id]['router'] = router
            await self.enqueue_data(id=request_id, data=self.__pool[request_id])
            self.pool_locked = False
            return None
        
    async def enqueue_data(self, id, data):
        while not self.deque_locked:
            self.deque_locked = True
            self.input_data_queue.append((id, data))
            self.deque_locked = False
            return None

    async def __get_latest_data(self):
        if not self.input_data_queue:
            return None
        return self.input_data_queue.popleft()

    @staticmethod
    def create_file_handler(file_name):
        logger = logging.getLogger(file_name)
        logger.setLevel(logging.INFO)
        f_format = logging.Formatter('%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s', datefmt="%H:%M:%S")
        f_handler = MyTimedRotatingFileHandler(file_name)
        f_handler.setFormatter(f_format)
        f_handler.suffix = "%Y-%m-%d"
        logger.addHandler(f_handler)
        return logger

    # def __store_message(self, *message, request_id: Any):
    #     if request_id in self.__pool.keys():
    #         self.__pool[request_id]['message'].extend([str(msg) for msg in message])
    #     else:
    #         self.__pool[request_id] = {}
    #         self.__pool[request_id]['message'] = [str(msg) for msg in message]

    # def add_message(self, *kargs):
    #     request_id = get_http_request_id(sys._getframe(0))
    #     # print(request_id)
    #     self.__store_message(*kargs, request_id=request_id)
        
    # def start(self, request: Any = None, request_user: Any = None):
    #     request_id = get_http_request_id(sys._getframe(0))
    #     # print(request_id)
    #     message = "\n"
    #     if request_user:
    #         message += f"USER: {request_user.username}\n"
    #         message += f"ROLE: {request_user.role}\n"
    #     if request:
    #         message += f"REQUEST: method={request.method}, url={request.url}"
    #     self.__store_message(message, request_id=request_id)

    # def end(self, path: str = None, response: Any = None):
    #     request_id = get_http_request_id(sys._getframe(0))
    #     # print(request_id)
    #     message = ""
    #     if response:
    #         message += f"RESPONSE: status={response.status_code}, process_time={response.headers['X-Process-Time']}"
    #     else:
    #         message += "RESPONSE: None"
    #     message += "\n\n=================================================\n"
    #     self.__store_message(message, request_id=request_id)
    #     router = path.split('/')[1]
    #     if router not in Logger.routers:
    #         self.__loggers['stranger'].info("\n".join(self.__pool[request_id]['message']))
    #     else: 
    #         self.__loggers[router].info("\n".join(self.__pool[request_id]['message']))
        # print(2)

logger = Logger()
