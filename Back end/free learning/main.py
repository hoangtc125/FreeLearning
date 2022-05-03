import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from router.user_router import router as USER_ROUTER
from router.admin_router import router as ADMIN_ROUTER
from router.search_router import router as SEARCH_ROUTER
from router.follow_router import router as FOLLOW_ROUTER
from core.filter import (
    authorize_token,
    check_api_permission,
)
from exception.http_exception import PermissionDeniedException

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """

    A middleware to add new information( executor, process time,...)
    to request and response header.
    - If a valid token is found in header. The executor of the request
    will be added to request header.

    Args:
        request (Request): The resquest data.
        call_next: A function call_next that will receive
                   the request as a parameter.

    Returns:
        response: The modified response to corresponding request.

    """
    start_time = time.time()
    if request.method != "OPTIONS":
        request_user = authorize_token(
            request=request
        )
        try:
            check_api_permission(
                path=request.url.path,
                request_role=request_user.role
            )
        except PermissionDeniedException as e:
            return JSONResponse(
                status_code=e.status_code,
                headers=e.headers
            )
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

app.include_router(USER_ROUTER)
app.include_router(ADMIN_ROUTER)
app.include_router(SEARCH_ROUTER)
app.include_router(FOLLOW_ROUTER)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1234)


