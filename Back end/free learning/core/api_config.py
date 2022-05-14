from core.constants import Role


class UserAPI:
    LOGIN = "/user/login"
    REGISTER = "/user/register"
    PROFILE = "/user/me"
    UPDATE_PROFILE = "/user/update-profile"
    UPDATE_PASSWORD = "/user/update-password"
    FIND_ONE = "/user/find-one"
    FORGOT_PASSWORD = '/user/forgot-password'


class ReportAPI:
    pass


class AdminAPI:
    GET_ONE_USER = "/admin/get-one-user"
    GET_ALL_USER = "/admin/get-all-user"


class SearchAPI:
    SEARCH = "/search"


class FollowAPI:
    SUBCRIBE = "/follow/subcribe"
    GET_FOLLOWERS = "/follow/get-followers"


# class

ALLOW_ALL = ["*"]

API_PERMISSION = {
    UserAPI.LOGIN: ALLOW_ALL,
    UserAPI.REGISTER: ALLOW_ALL,
    UserAPI.PROFILE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.UPDATE_PASSWORD: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.UPDATE_PROFILE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.FIND_ONE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.FORGOT_PASSWORD: ALLOW_ALL,
    AdminAPI.GET_ONE_USER: ALLOW_ALL,
    AdminAPI.GET_ALL_USER: [Role.ADMIN],
    SearchAPI.SEARCH: ALLOW_ALL,
    FollowAPI.SUBCRIBE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    FollowAPI.GET_FOLLOWERS: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
}
