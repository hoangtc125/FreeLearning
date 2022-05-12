from fastapi import Request


def get_actor_from_request(request: Request):
    try:
        return request._headers["x-request-user"]
    except:
        return None
