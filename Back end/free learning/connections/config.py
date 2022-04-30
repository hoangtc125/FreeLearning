import motor.motor_asyncio
from decouple import config

from utils.user_utils import to_response_dict_user

MONGO_DETAILS = config("MONGO_DETAILS")  # read environment variable

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.freelearning

USER_COLLECTION = database.get_collection('User')
TOKEN_COLLECTION = database.get_collection('Token')
