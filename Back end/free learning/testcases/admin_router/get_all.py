from core.constants import Role
from core.model import success_response
from model.user import Account, AccountResponse
from router.admin_router import get_all
from testcases.fake import Repo, Datetime


TEST_CASE = {}

TEST_CASE["NO_USER"] = {
    "INPUT": {
        "token": "token",
    },
    "MOCK": [
        {
            "path": "service.admin_service.get_repo",
            "return_value": Repo(return_get_all={}),
        }
    ],
    "OUTPUT": success_response(data=[]),
    "FUNCTION": get_all,
}

TEST_CASE["NOMAL"] = {
    "INPUT": {
        "token": "token",
    },
    "MOCK": [
        {
            "path": "service.admin_service.get_repo",
            "return_value": Repo(
                return_get_all={
                    "1": Account(
                        username="string",
                        phone="string",
                        fullname="string",
                        email="string",
                        avatar="string",
                        role=Role.STUDENT,
                        hashed_password="123",
                    ),
                    "2": Account(
                        username="string",
                        phone="string",
                        fullname="string",
                        email="string",
                        avatar="string",
                        role=Role.STUDENT,
                        hashed_password="123",
                    ),
                }
            ),
        }
    ],
    "OUTPUT": success_response(
        data=[
            AccountResponse(
                username="string",
                phone="string",
                fullname="string",
                email="string",
                avatar="string",
                role=Role.STUDENT,
                hashed_password="123",
                id="1",
            ),
            AccountResponse(
                username="string",
                phone="string",
                fullname="string",
                email="string",
                avatar="string",
                role=Role.STUDENT,
                hashed_password="123",
                id="2",
            ),
        ]
    ),
    "FUNCTION": get_all,
}


if __name__ == "__main__":
    pass
