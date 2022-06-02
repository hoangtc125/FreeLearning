import logging
import os, sys
import threading
from time import sleep
import traceback
import yaml
from yaml.loader import SafeLoader
from collections import deque
from datetime import datetime
from starlette.middleware.base import BaseHTTPMiddleware
from logging.handlers import TimedRotatingFileHandler

from core.project_config import LOG_DIR, settings
from core.helpper import mac_from_ip
from utils.time_utils import get_current_timestamp

class MyTimedRotatingFileHandler(TimedRotatingFileHandler):
    def __init__(self, router: str, mapping: str):
        self.__file_name = mapping[router]
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
    

class Logger:

    def __init__(self):
        self.__pool = {}
        self.__input_data_queue = deque()
        self.__is_locked = False
        self.__mapping = Logger.get_dir_mapping()
        self.__routers = list(self.__mapping.keys())

        loggers = {}
        for router in self.__routers:
            _logger = Logger.create_file_handler(router=router, mapping=self.__mapping)
            loggers[router] = {
                "critical": _logger.critical,
                "warning": _logger.warning,
                "debug": _logger.debug,
                "error": _logger.error,
                "info": _logger.info,
            }
        self.__loggers = loggers

        logger_thread = threading.Thread(target=self.__log, args=())
        logger_thread.daemon = True
        logger_thread.start()

    def __log(self):
        sleep(1)
        while True:
            try:
                res = self.__get_latest_data()
                if not res:
                    continue

                request_id, latest_data ,tag, level = res

                if tag == 'start':
                    self.__pool[request_id] = {}
                    self.__pool[request_id]['data'] = []
                    self.__pool[request_id]['created_at'] = get_current_timestamp()

                    request, request_user = latest_data
                    if request_user:
                        self.__pool[request_id]['data'].append((f"USER: {request_user.username}, ROLE: {request_user.role}", level))
                    if request:
                        self.__pool[request_id]['data'].append((f"CLIENT: client={request.client}, mac={mac_from_ip(request.client.host)}", level))
                        self.__pool[request_id]['data'].append((f"REQUEST: method={request.method}, url={request.url}", level))
                    continue

                if tag == 'add':
                    self.__pool[request_id]['data'].extend([(str(msg), level) for msg in latest_data])
                    continue

                path, response = latest_data
                if response:
                    self.__pool[request_id]['data'].append((f"RESPONSE: status={response.status_code}, process_time={response.headers['X-Process-Time']}", level))
                else:
                    self.__pool[request_id]['data'].append(("RESPONSE: None", level))
                self.__pool[request_id]['data'].append(("\n=================================================\n", level))

                router = path.split('/')[1]
                if router not in self.__routers:
                    router = 'stranger'
                
                for data in self.__pool[request_id]['data']:
                    _message, _level = data
                    self.__loggers[router][_level](_message)
                self.__pool.pop(request_id)
            except Exception as e:
                traceback.print_exc()
        
    def log(self, *args, tag='add', level='info'):
        request_id = Logger.get_http_request_id(sys._getframe(0))
        while not self.__is_locked:
            self.__is_locked = True
            self.__input_data_queue.append((request_id, args, tag, level))
            self.__is_locked = False
            return None

    def __get_latest_data(self):
        if not self.__input_data_queue:
            return None
        return self.__input_data_queue.popleft()

    @staticmethod
    def get_http_request_id(frame=sys._getframe(0), context = 1):
        while frame:
            if 'self' in frame.f_locals.keys() and isinstance(frame.f_locals['self'], BaseHTTPMiddleware):
                return id(frame.f_locals['scope'])
            frame = frame.f_back
        return 1

    @staticmethod
    def get_dir_mapping():
        with open(settings.LOG_DIR_MAPPING) as f:
            return yaml.load(f, Loader=SafeLoader)

    @staticmethod
    def create_file_handler(router, mapping):
        logger = logging.getLogger(router)
        logger.setLevel(settings.LOG_LEVEL)
        f_format = logging.Formatter('%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s', datefmt="%H:%M:%S")
        f_handler = MyTimedRotatingFileHandler(router=router, mapping=mapping)
        f_handler.setFormatter(f_format)
        f_handler.suffix = "%Y-%m-%d"
        logger.addHandler(f_handler)
        return logger

logger = Logger()
