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
    LOGGING_CONFIG_FOLDER = os.path.join(LOG_DIR, "log/")
    SECURITY_ALGORITHM = "HS256"
    UNIQUE_ID = get_pc_unique_id()


settings = Settings()

if __name__ == "__main__":
    print(settings)
