import logging
import os, re, uuid
from dotenv import load_dotenv
from pydantic import BaseSettings

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../"))
LOG_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
load_dotenv(os.path.join(BASE_DIR, ".env"))


def get_pc_unique_id():
    return str(hex(uuid.getnode()))


class Settings(BaseSettings):
    PROJECT_NAME = os.getenv("PROJECT_NAME", "FASTAPI BASE")
    SECRET_KEY = os.getenv("SECRET_KEY", "")
    API_PREFIX = ""
    BACKEND_CORS_ORIGINS = ["*"]
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # Token expired after 7 days
    SECURITY_ALGORITHM = "HS256"
    UNIQUE_ID = get_pc_unique_id()
    LOG_LEVEL = logging.DEBUG
    LOG_DIR_MAPPING = BASE_DIR + '/resources/log_dir_config.yaml'
    LOG_TIME_OUT = 5
    CACHE_TIME_TO_LIVE = 100
    BACKEND_NAME = os.path.basename(BASE_DIR)


settings = Settings()

print(settings)
