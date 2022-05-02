import time
from exception.http_exception import RequestException
from connections.mongo_connector import get_repo
from core.model import TokenPayload
from model.search import Search, SearchAccount, SearchResponse, SearchResult, SearchToken
from model.token import ConfirmationToken
from model.user import Account
from utils.model_utils import get_dict
from core.project_config import settings
from connections.config import USER_COLLECTION, TOKEN_COLLECTION


class SearchService:

  ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

  def __init__(self):
    self.account_repo = get_repo(Account, USER_COLLECTION)
    self.token_repo = get_repo(ConfirmationToken, TOKEN_COLLECTION)
    self.repos = {}
    self.repos["user"] = {"repo": self.account_repo, "field_looking": "fullname", "response_model": SearchAccount}
    self.repos["token"] = {"repo": self.token_repo, "field_looking": "token_type", "response_model": SearchToken}

  async def search_in_repos(self, search_form: Search):
    start_time = time.time()
    res = []
    if search_form.search_type not in self.repos.keys():
      raise RequestException(
        message="Don't support this filter"
      )
    for key, repo in self.repos.items():
      all_resp = await repo["repo"].get_all()
      match_resp = []
      for value in all_resp.values():
        if(getattr(value, repo["field_looking"]) == search_form.key_word):
          match_resp.append(repo["response_model"](**get_dict(value)))
      res.append(SearchResult(search_type=key, result=match_resp))
    for idx, data in enumerate(res):
      if(data.search_type == search_form.search_type and idx != 0):
        temp_data = res[0]
        res[0] = res[idx]
        res[idx] = temp_data
    process_time = time.time() - start_time
    return SearchResponse(
      search_type=search_form.search_type, 
      key_word=search_form.key_word,
      results=res,
      process_time=process_time
    )