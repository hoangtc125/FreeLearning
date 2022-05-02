import time
from typing import Union
from core.constants import Role
from exception.http_exception import CredentialException, RequestException, UnprocessableEntityException
from connections.mongo_connector import get_repo
from core.model import TokenPayload
from model import (
  Account, AccountUpdate, AccountCreate, AccountResponse,
  ConfirmationToken
)
from model.search import Search, SearchResponse, SearchResult
from model.user import PasswordUpdate
from utils.model_utils import get_dict, to_response_dto
from core.project_config import settings
from utils.time_utils import get_current_timestamp, get_timestamp_after
from connections.config import USER_COLLECTION, TOKEN_COLLECTION


class SearchService:

  ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

  def __init__(self):
    self.account_repo = get_repo(Account, USER_COLLECTION)
    self.token_repo = get_repo(ConfirmationToken, TOKEN_COLLECTION)
    self.repos = {}
    self.repos["user"] = {"repo": self.account_repo, "field": "fullname", "respone": Account}
    self.repos["token"] = {"repo": self.token_repo, "field": "token_type", "respone": ConfirmationToken}

  async def search_in_repos(self, search_form: Search):
    start_time = time.time()
    res = []
    if not search_form.search_type:
      for key, repo in self.repos.items():
        resp = await repo["repo"].get_all()
        match_resp = []
        for value in resp.values():
          if(getattr(value, repo["field"]) == search_form.key_word):
            match_resp.append(value)
        res.append(SearchResult(search_type=key, result=match_resp))
    else:
      if search_form.search_type not in self.repos.keys():
        raise RequestException(
          message="Don't support this filter"
        )
      filter_resp = await self.repos[search_form.search_type]["repo"].get_all()
      match_resp = []
      for value in filter_resp.values():
        if(getattr(value, self.repos[search_form.search_type]["field"]) == search_form.key_word):
          match_resp.append(value)
      res.append(SearchResult(search_type=search_form.search_type, result=match_resp))
      for key, repo in self.repos.items():
        if(key == search_form.search_type):
          continue
        resp = await repo["repo"].get_all()
        match_resp = []
        for value in resp.values():
          if(getattr(value, repo["field"]) == search_form.key_word):
            match_resp.append(value)
        res.append(SearchResult(search_type=key, result=match_resp))
    process_time = time.time() - start_time
    return SearchResponse(
      search_type=search_form.search_type, 
      key_word=search_form.key_word,
      results=res,
      process_time=process_time
    )