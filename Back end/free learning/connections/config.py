import motor.motor_asyncio
from decouple import config

MONGO_DETAILS = config("MONGO_DETAILS")  # read environment variable

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.freelearning

USER_COLLECTION = database.get_collection('User')
TOKEN_COLLECTION = database.get_collection('Token')
COMMENT_COLLECTION = database.get_collection('Comment')
LESSION_COLLECTION = database.get_collection('Lession')
FOLLOW_COLLECTION = database.get_collection('Follow')
COURSE_COLLECTION = database.get_collection('Course')
HOMEWORK_COLLECTION = database.get_collection('Homework')
