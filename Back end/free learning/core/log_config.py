import logging
from logging.handlers import TimedRotatingFileHandler
from typing import Any
from core.project_config import settings

# Create a custom logger
loggers = {}

def createLogger(name):
  logger = logging.getLogger(name)
  logger.setLevel(logging.INFO)
  f_format = logging.Formatter('%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s', datefmt="%H:%M:%S")
  f_handler = TimedRotatingFileHandler(settings.LOGGING_CONFIG_FOLDER + name + "/logger.log", when="midnight", interval=1)
  f_handler.setFormatter(f_format)
  f_handler.suffix = "%Y-%m-%d"
  logger.addHandler(f_handler)
  return logger

loggers['admin'] = createLogger('admin')
loggers['follow'] = createLogger('follow')
loggers['search'] = createLogger('search')
loggers['user'] = createLogger('user')

def logging(request: Any = None, response: Any = None, request_user: Any = None):
  router = request.url.path.split('/')[1]
  if router not in ['user', 'follow', 'admin', 'search']:
    return
  message = ""
  if request_user:
    try:
      message += f"username: {request_user.username}, role: {request_user.role}, , host: {request.url.hostname}, api: {request.url.path}, "
    except:
      pass
  message += f"scheme: , method: {request.__dict__['scope']['method']}, "
  message += f"status code: {response.__dict__['status_code']}"
  loggers[router].info(message)