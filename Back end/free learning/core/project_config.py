import logging
import os, re, uuid
from dotenv import load_dotenv
from pydantic import BaseSettings

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../"))
load_dotenv(os.path.join(BASE_DIR, ".env"))


def get_pc_unique_id():
    return str(hex(uuid.getnode()))


class Settings(BaseSettings):
    MONGO_URL = os.getenv("MONGO_URL", "mongodb+srv://free-learning:freelearningvn@free-learning.iyfax.mongodb.net/freelearning?retryWrites=true&w=majority")
    PROJECT_NAME = os.getenv("PROJECT_NAME", "FREE LEARNING")
    SECRET_KEY = os.getenv("SECRET_KEY", "123123")
    API_PREFIX = ""
    BACKEND_CORS_ORIGINS = ["*"]
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # Token expired after 7 days
    SECURITY_ALGORITHM = "HS256"
    UNIQUE_ID = get_pc_unique_id()
    LOG_LEVEL = logging.DEBUG
    LOG_DIR_MAPPING = BASE_DIR + '/resources/log_dir_config.yaml'
    LOG_DIR = os.getenv("LOG_DIR", os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))
    LOG_TIME_OUT = os.getenv("LOG_TIME_OUT", 5)
    REDIS_MAXMEMORY = os.getenv("REDIS_MAXMEMORY", "50M")
    REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT = os.getenv("REDIS_PORT", 6379)
    REDIS_POLICY = os.getenv("REDIS_POLICY", "allkeys-lru")
    REDIS_TIME_TO_LIVE = os.getenv("REDIS_TIME_TO_LIVE", 60 * 60 * 24)
    BACKEND_NAME = os.getenv("BACKEND_NAME", os.path.basename(BASE_DIR))
    BACKEND_PORT = os.getenv("BACKEND_PORT", 1234)

settings = Settings()

print(settings)
