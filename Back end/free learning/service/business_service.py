from random import randint
from typing import Union
import uuid
import starlette
from core.constants import Category, Role
from exception.http_exception import CredentialException, UnprocessableEntityException
from connections.mongo_connector import get_repo
from core.model import TokenPayload
from model import (
    Account,
    AccountUpdate,
    AccountCreate,
    AccountResponse,
    ConfirmationToken,
)
from model.course import Course, CourseCreate, CourseResponse, CourseUpdate
from model.lession import Lession, LessionCreate, LessionResponse, LessionUpdate
from service.user_service import AccountService
from utils.mail_utils import send_mail
from utils.model_utils import get_dict, to_response_dto
from core.project_config import settings
from utils.time_utils import get_current_timestamp, get_timestamp_after
from connections.config import LESSION_COLLECTION, USER_COLLECTION, COURSE_COLLECTION
# from core.log_config import logger


class BusinessService():

    def __init__(self):
        self.account_repo = get_repo(Account, USER_COLLECTION)
        self.course_repo = get_repo(Course, COURSE_COLLECTION)
        self.lession_repo = get_repo(Lession, LESSION_COLLECTION)

    @staticmethod
    def validate_course(item: Union[Course, CourseCreate, CourseUpdate, Lession, LessionCreate, LessionUpdate]):
        # validate role
        if item.course_type not in Category.__dict__.values():
            raise Exception("Unsupport Category")

    async def get_one_course_by_id(self, doc_id: str):
        resp = await self.course_repo.get_one_by_id(doc_id=uuid.UUID(doc_id))
        if not resp:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Course doesn't exist",
            )
        _id, course = resp
        return to_response_dto(_id, course, CourseResponse)

    async def get_one_lession_by_id(self, doc_id: str):
        resp = await self.lession_repo.get_one_by_id(doc_id=uuid.UUID(doc_id))
        if not resp:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Lession doesn't exist",
            )
        course_id, course = resp
        user = await AccountService().get_account_by_field(value=course.at_username)
        return [to_response_dto(course_id, course, LessionResponse), user] 

    async def get_all_courses(self, username: str = None):
        # logger.add_message(username)
        filter = {"_source.at_username": username}
        res = await self.course_repo.get_all(filter=filter)
        if not res:
            return None
        list_resp = []
        for doc_id, course in res.items():
            list_resp.append(to_response_dto(doc_id, course, CourseResponse))
        return list_resp

    async def create_course(self, course: CourseCreate, username: str = None):
        _account = await AccountService().get_account_by_field(field="username", value=username)
        if not _account:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Account doesn't exist",
            )
        try:
            self.validate_course(course)
        except Exception as e:
            raise UnprocessableEntityException(message=str(e))
        setattr(course, 'at_username', username)
        setattr(course, 'number_of_views', 0)
        setattr(course, 'created_at', get_current_timestamp())
        setattr(course, 'modified_at', get_current_timestamp())
        _course = Course(**get_dict(course))
        try:
            doc_id = await self.course_repo.insert_one(obj=_course)
            return to_response_dto(doc_id, _course, CourseResponse)
        except Exception as e:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Create course failed",
            )  
        
    async def update_course(self, course: CourseUpdate, username: str = None):
        _account = await AccountService().get_account_by_field(field="username", value=username)
        if not _account:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Account doesn't exist",
            )
        try:
            self.validate_course(course)
            old_course_id, old_course = await self.course_repo.get_one_by_id(doc_id=uuid.UUID(course.id))
        except Exception as e:
            raise UnprocessableEntityException(message=str(e))
        if not old_course:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Course doesn't exist",
            )
        setattr(course, 'at_username', old_course.at_username)
        setattr(course, 'number_of_views', old_course.number_of_views)
        setattr(course, 'created_at', old_course.created_at)
        setattr(course, 'modified_at', get_current_timestamp())
        _course = Course(**get_dict(course))
        try:
            doc_id = await self.course_repo.update(obj=_course, doc_id=uuid.UUID(course.id))
            return to_response_dto(doc_id, _course, CourseResponse)  
        except Exception as e:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Update course failed",
            )       

    async def delete_one_course(self, course_id: str, username: str = None):
        _account = await AccountService().get_account_by_field(field="username", value=username)
        if not _account:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Account doesn't exist",
            )
        try:
            await self.course_repo.delete(_id=uuid.UUID(course_id))
            return "Delete successful"
        except Exception as e:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Course doesn't exist",
            )  

    async def create_lession(self, lession: LessionCreate, username: str = None):
        _account = await AccountService().get_account_by_field(field="username", value=username)
        if not _account:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Account doesn't exist",
            )
        # try:
        #     _course = await self.course_repo.get_one_by_id(doc_id=uuid.UUID(lession.at_course_id))
        #     if not _course:
        #         raise CredentialException(
        #             status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
        #             message="Course doesn't exist",
        #         )
        # except Exception as e:
        #     raise CredentialException(
        #         status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
        #         message="Course doesn't exist",
        #     )  
        try:
            self.validate_course(lession)
        except Exception as e:
            raise UnprocessableEntityException(message=str(e))
        setattr(lession, 'at_username', username)
        setattr(lession, 'number_of_views', 0)
        setattr(lession, 'created_at', get_current_timestamp())
        setattr(lession, 'modified_at', get_current_timestamp())
        _lession = Lession(**get_dict(lession))
        try:
            doc_id = await self.lession_repo.insert_one(obj=_lession)
            return to_response_dto(doc_id, _lession, LessionResponse)
        except Exception as e:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Lession course failed",
            )  
        
    async def update_lession(self, lession: LessionUpdate, username: str = None):
        _account = await AccountService().get_account_by_field(field="username", value=username)
        if not _account:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Account doesn't exist",
            )
        try:
            self.validate_course(lession)
            old_lession_id, old_lession = await self.lession_repo.get_one_by_id(doc_id=uuid.UUID(lession.id))
        except Exception as e:
            raise UnprocessableEntityException(message=str(e))
        if not old_lession:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Update lession failed",
            )
        setattr(lession, 'at_username', old_lession.at_username)
        setattr(lession, 'number_of_views', old_lession.number_of_views)
        setattr(lession, 'created_at', old_lession.created_at)
        setattr(lession, 'modified_at', get_current_timestamp())
        setattr(lession, 'at_course_id', old_lession.at_course_id)
        setattr(lession, 'is_approved', old_lession.is_approved)
        _lession = Lession(**get_dict(lession))
        try:
            doc_id = await self.lession_repo.update(obj=_lession, doc_id=uuid.UUID(lession.id))
            return to_response_dto(doc_id, _lession, LessionResponse)  
        except Exception as e:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Update lession failed",
            )       

    async def delete_one_lession(self, lession_id: str, username: str = None):
        _account = await AccountService().get_account_by_field(field="username", value=username)
        if not _account:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Account doesn't exist",
            )
        try:
            await self.lession_repo.delete(_id=uuid.UUID(lession_id))
            return "Delete successful"
        except Exception as e:
            raise CredentialException(
                status_code=starlette.status.HTTP_412_PRECONDITION_FAILED,
                message="Lession doesn't exist",
            )  