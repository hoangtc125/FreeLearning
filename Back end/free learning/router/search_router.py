from fastapi import APIRouter

from core.model import HttpResponse, success_response
from model.search import Search
from service.search_service import SearchService
from core.api_config import SearchAPI
from core.log_config import logger

router = APIRouter()


@router.post(SearchAPI.SEARCH, response_model=HttpResponse)
async def search(search_form: Search):
    logger.enqueue_data(search_form)
    result = await SearchService().search_in_repos(search_form)
    return success_response(data=result)
