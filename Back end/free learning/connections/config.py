from motor.motor_asyncio import AsyncIOMotorClient
from core.project_config import settings


class db:

    client: AsyncIOMotorClient = None
    database = None
    USER_COLLECTION = None
    TOKEN_COLLECTION = None
    COMMENT_COLLECTION = None
    LESSION_COLLECTION = None
    FOLLOW_COLLECTION = None
    COURSE_COLLECTION = None
    HOMEWORK_COLLECTION = None
    NOTIFICATION_COLLECTION = None
    POST_COLLECTION = None

    def __init__(self) -> None:
        pass

    @staticmethod
    async def connect_db():
        """Create database connection."""

        db.client = AsyncIOMotorClient(settings.MONGO_URL)
        db.database = db.client.freelearning
        db.USER_COLLECTION = db.database.get_collection("User")
        db.TOKEN_COLLECTION = db.database.get_collection("Token")
        db.COMMENT_COLLECTION = db.database.get_collection("Comment")
        db.LESSION_COLLECTION = db.database.get_collection("Lession")
        db.FOLLOW_COLLECTION = db.database.get_collection("Follow")
        db.COURSE_COLLECTION = db.database.get_collection("Course")
        db.HOMEWORK_COLLECTION = db.database.get_collection("Homework")
        db.NOTIFICATION_COLLECTION = db.database.get_collection("Notification")
        db.POST_COLLECTION = db.database.get_collection("Post")

    @staticmethod
    async def close_db():
        """Close database connection."""
        db.client.close()

