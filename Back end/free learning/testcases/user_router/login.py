from core.constants import Role
from core.model import TokenPayload, success_response
from model.token import ConfirmationToken
from model.user import Account, AccountResponse
from router.user_router import login
from jose import jwt
from testcases.fake import Repo, Form_data
from utils.jwt_utils import ALGORITHM, SECRET_KEY, get_hashed_password
from utils.model_utils import get_dict

TEST_CASE = {}


TEST_CASE["NOT_ACCOUNT_EXIST"] = {
    "INPUT": {
        "form_data": Form_data(
            username="string",
            password=123,
        ),
    },
    "MOCK": [
        {
            "path": "service.user_service.get_repo",
            "return_value": Repo(return_get_one_by_field=None),
        },
    ],
    "OUTPUT": Exception(),
    "FUNCTION": login,
}

TEST_CASE["PASSWORD_MISS_MATCHING"] = {
    "INPUT": {
        "form_data": Form_data(
            username="string",
            password=321,
        ),
    },
    "MOCK": [
        {
            "path": "service.user_service.get_repo",
            "return_value": Repo(
                return_get_one_by_field=(
                    "1",
                    Account(
                        id="1",
                        username="string",
                        phone="123123",
                        fullname="string string",
                        role=Role.STUDENT,
                        email="string string",
                        hashed_password=get_hashed_password("123"),
                        created_at=123,
                    ),
                ),
            ),
        },
    ],
    "OUTPUT": Exception(),
    "FUNCTION": login,
}

TEST_CASE["SUCCESS_CREATE_NEW_TOKEN"] = {
    "INPUT": {
        "form_data": Form_data(
            username="string",
            password=123,
        ),
    },
    "MOCK": [
        {
            "path": "service.user_service.get_repo",
            "return_value": Repo(
                return_get_one_by_field=(
                    "1",
                    Account(
                        id="1",
                        username="string",
                        phone="123123",
                        fullname="string string",
                        role=Role.STUDENT,
                        email="string string",
                        hashed_password=get_hashed_password("123"),
                        created_at=123,
                    ),
                ),
                return_update=None,
                return_get_one_by_id=None,
            ),
        },
        {
            "path": "utils.jwt_utils.get_current_timestamp",
            "return_value": 123,
        },
        {
            "path": "service.user_service.get_timestamp_after",
            "return_value": 222,
        },
    ],
    "OUTPUT": {
        "token_type": "Bearer",
        "access_token": jwt.encode(
            get_dict(
                TokenPayload(username="string", role=Role.STUDENT, expire_time=222)
            ),
            SECRET_KEY,
            algorithm=ALGORITHM,
        ),
    },
    "FUNCTION": login,
}

TEST_CASE["SUCCESS_RETURN_CURRENT_TOKEN"] = {
    "INPUT": {
        "form_data": Form_data(
            username="string",
            password=123,
        ),
    },
    "MOCK": [
        {
            "path": "service.user_service.get_repo",
            "return_value": Repo(
                return_get_one_by_field=(
                    "1",
                    Account(
                        id="1",
                        username="string",
                        phone="123123",
                        fullname="string string",
                        role=Role.STUDENT,
                        email="string string",
                        hashed_password=get_hashed_password("123"),
                        created_at=123,
                    ),
                ),
                return_update=None,
                return_get_one_by_id=(
                    "1",
                    ConfirmationToken(
                        token_type="Bearer",
                        created_at=12,
                        expires_at=1234,
                        token=jwt.encode(
                            get_dict(
                                TokenPayload(
                                    username="string",
                                    role=Role.STUDENT,
                                    expire_time=1111,
                                )
                            ),
                            SECRET_KEY,
                            algorithm=ALGORITHM,
                        ),
                    ),
                ),
            ),
        },
        {
            "path": "utils.jwt_utils.get_current_timestamp",
            "return_value": 123,
        },
        {
            "path": "service.user_service.get_current_timestamp",
            "return_value": 123,
        },
        {
            "path": "service.user_service.get_timestamp_after",
            "return_value": 222,
        },
    ],
    "OUTPUT": {
        "token_type": "Bearer",
        "access_token": jwt.encode(
            get_dict(
                TokenPayload(username="string", role=Role.STUDENT, expire_time=1111)
            ),
            SECRET_KEY,
            algorithm=ALGORITHM,
        ),
    },
    "FUNCTION": login,
}

TEST_CASE["SUCCESS_UPDATE_TOKEN"] = {
    "INPUT": {
        "form_data": Form_data(
            username="string",
            password=123,
        ),
    },
    "MOCK": [
        {
            "path": "service.user_service.get_repo",
            "return_value": Repo(
                return_get_one_by_field=(
                    "1",
                    Account(
                        id="1",
                        username="string",
                        phone="123123",
                        fullname="string string",
                        role=Role.STUDENT,
                        email="string string",
                        hashed_password=get_hashed_password("123"),
                        created_at=123,
                    ),
                ),
                return_update=None,
                return_get_one_by_id=(
                    "1",
                    ConfirmationToken(
                        token_type="Bearer",
                        created_at=12,
                        expires_at=111,
                        token=jwt.encode(
                            get_dict(
                                TokenPayload(
                                    username="string",
                                    role=Role.STUDENT,
                                    expire_time=111,
                                )
                            ),
                            SECRET_KEY,
                            algorithm=ALGORITHM,
                        ),
                    ),
                ),
            ),
        },
        {
            "path": "utils.jwt_utils.get_current_timestamp",
            "return_value": 123,
        },
        {
            "path": "service.user_service.get_current_timestamp",
            "return_value": 123,
        },
        {
            "path": "service.user_service.get_timestamp_after",
            "return_value": 222,
        },
    ],
    "OUTPUT": {
        "token_type": "Bearer",
        "access_token": jwt.encode(
            get_dict(
                TokenPayload(username="string", role=Role.STUDENT, expire_time=222)
            ),
            SECRET_KEY,
            algorithm=ALGORITHM,
        ),
    },
    "FUNCTION": login,
}


if __name__ == "__main__":
    pass
