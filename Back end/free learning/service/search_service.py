import time
from exception.http_exception import RequestException
from connections.mongo_connector import get_repo
from model.course import Course
from model.lession import Lession
from model.search import (
    LessionSearch,
    Search,
    SearchAccount,
    SearchCourse,
    SearchResponse,
    SearchResult,
    SearchToken,
)
from model.token import ConfirmationToken
from model.user import Account
from utils.model_utils import get_dict
from connections.config import COURSE_COLLECTION, LESSION_COLLECTION, USER_COLLECTION, TOKEN_COLLECTION
from core.log_config import logger
from core.cache_config import cache


class SearchService:
    def __init__(self):
        self.account_repo = get_repo(Account, USER_COLLECTION)
        self.course_repo = get_repo(Course, COURSE_COLLECTION)
        self.lession_repo = get_repo(Lession, LESSION_COLLECTION)
        self.repos = {}
        self.repos["user"] = {
            "repo": self.account_repo,
            "field_looking": "fullname",
            "response_model": SearchAccount,
        }
        self.repos["course"] = {
            "repo": self.course_repo,
            "field_looking": "description",
            "response_model": SearchCourse,
        }
        self.repos["lession"] = {
            "repo": self.lession_repo,
            "field_looking": "description",
            "response_model": LessionSearch,
        }

    @cache(reloaded_by=[Account, Course, Lession])
    async def search_in_repos(self, search_form: Search):
        if search_form.search_type not in self.repos.keys():
            raise RequestException(message="Don't support this filter")
        start_time = time.time()
        res = []
        for key, repo in self.repos.items():
            regx = {"$regex": "{}".format(search_form.key_word)}
            filter = {"_source.{}".format(repo["field_looking"]): regx}
            if not search_form.key_word:
                filter = None
            dict_resp = await repo["repo"].get_all(filter=filter)
            list_resp = []
            for _id, value in dict_resp.items():
                logger.log(_id)
                list_resp.append(repo["response_model"](**get_dict(value, allow_none=True), id=_id))
            res.append(SearchResult(search_type=key, result=list_resp))
        for idx, data in enumerate(res):
            if data.search_type == search_form.search_type and idx != 0:
                temp_data = res[0]
                res[0] = res[idx]
                res[idx] = temp_data
        process_time = time.time() - start_time
        return SearchResponse(
            search_type=search_form.search_type,
            key_word=search_form.key_word,
            results=res,
            process_time=process_time,
        )