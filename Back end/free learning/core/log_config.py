from datetime import datetime
import inspect
from inspect import FrameInfo, getframeinfo
import logging
from logging.handlers import TimedRotatingFileHandler
import os, sys
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
        

def get_http_request_id(frame=sys._getframe(1), context = 0):
    framelist = []
    while frame:
        frameinfo = (frame,) + getframeinfo(frame, context)
        c_frame = FrameInfo(*frameinfo)
        framelist.append(c_frame)
        if 'main.py' in c_frame.filename:
            return id(c_frame.frame)
        frame = frame.f_back
    return ""


class Logger:

    routers = ['admin', 'follow', 'search', 'user']

    def __init__(self):
        loggers = {}
        loggers['stranger'] = Logger.create_file_handler('stranger')
        for router in Logger.routers:
            loggers[router] = Logger.create_file_handler(router)
        self.__loggers = loggers
        self.__pool = {}

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
  
    def logging(self, request: Any = None, response: Any = None, request_user: Any = None):
        request_id = self.__trace_request_id()
        print(request_id)
        router = request.url.path.split('/')[1]

        message = "\n\n"
        if request_user:
            message += f"USER: {request_user.username}\n"
            message += f"ROLE: {request_user.role}\n"
        message += f"REQUEST: method={request.method}, url={request.url}\n"
        if isinstance(response, str):
            message += f"RESPONSE: status=500, message={response}\n"
        else:
            message += f"RESPONSE: status={response.status_code}, process_time={response.headers['X-Process-Time']}"

        self.__add_message(request_id=request_id, message=message)

        self.__pool[request_id].append("======================================\n")
        if router not in Logger.routers:
            print("aaa", get_current_timestamp())
            self.__loggers['stranger'].info("\n\n".join(self.__pool[request_id]))
        else: 
            print("aaa", get_current_timestamp())
            self.__loggers[router].info("\n\n".join(self.__pool[request_id]))

    def store_message(self, message: str = None):
        request_id = self.__trace_request_id()
        print(request_id)
        self.__add_message(request_id=request_id, message=message)

    def __add_message(self, request_id: Any, message: str = None):
        if request_id in self.__pool.keys():
            self.__pool[request_id].insert(0, message)
        else:
            self.__pool[request_id] = [message]

    def __trace_request_id(self):
        iframe_middleware_base = [iframe for iframe in inspect.stack(0) if 'middleware/base' in iframe.filename][0]
        _, id = iframe_middleware_base.frame.f_locals['scope']['headers'][-1]
        return id

logger = Logger()
