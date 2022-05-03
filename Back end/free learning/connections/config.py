import motor.motor_asyncio
from decouple import config

MONGO_DETAILS = config("MONGO_DETAILS")  # read environment variable

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.freelearning

USER_COLLECTION = database.get_collection('User')
TOKEN_COLLECTION = database.get_collection('Token')
