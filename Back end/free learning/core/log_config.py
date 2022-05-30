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
    while frame:
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

        logger_thread = threading.Thread(target=self.__log, args=())
        logger_thread.daemon = True
        logger_thread.start()

    def __log(self):
        print("create logging thread")
        while True:
            try:
                res = self.__get_latest_data()
                if not res:
                    continue
                request_id, tag, latest_data = res

                if tag == 'start':
                    self.__pool[request_id] = {}
                    self.__pool[request_id]['message'] = latest_data['message']
                    self.__pool[request_id]['created_at'] = get_current_timestamp()
                    continue

                self.__pool[request_id]['message'].extend([str(msg) for msg in latest_data['message']])
                if tag == 'add':
                    continue

                if latest_data['router'] not in Logger.routers:
                    self.__loggers['stranger'].info("\n".join(self.__pool[request_id]['message']))
                else: 
                    self.__loggers[latest_data['router']].info("\n".join(self.__pool[request_id]['message']))
            except Exception as e:
                traceback.print_exc()
        
    def enqueue_data(self, *args, tag = 'add'):
        data = {"message":[]}
        request_id = get_http_request_id(sys._getframe(0))
        if tag == 'start':
            request, request_user = args
            if request_user:
                data['message'].append(f"\nUSER: {request_user.username}")
                data['message'].append(f"ROLE: {request_user.role}")
            if request:
                data['message'].append(f"REQUEST: method={request.method}, url={request.url}")
        elif tag == 'end':
            path, response = args
            if response:
                data['message'].append(f"RESPONSE: status={response.status_code}, process_time={response.headers['X-Process-Time']}")
            else:
                data['message'].append("RESPONSE: None")
            data['message'].append("\n=================================================\n")
            router = path.split('/')[1]
            data['router'] = router
        elif tag == 'add':
            data['message'].extend([str(msg) for msg in args])
        while not self.deque_locked:
            self.deque_locked = True
            self.input_data_queue.append((request_id, tag, data))
            self.deque_locked = False
            return None

    def __get_latest_data(self):
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

logger = Logger()
