import logging
from logging.handlers import TimedRotatingFileHandler
from core.project_config import settings

# Create a custom logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
f_format = logging.Formatter('%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s', datefmt="%H:%M:%S")
f_handler = TimedRotatingFileHandler(settings.LOGGING_CONFIG_FOLDER, when="midnight", interval=1)
f_handler.setFormatter(f_format)
f_handler.suffix = "%Y-%m-%d"
logger.addHandler(f_handler)