from core.constants import Role


class UserAPI:
    LOGIN = "/api/user/login"
    REGISTER = "/api/user/register"
    PROFILE = "/api/user/me"
    UPDATE_PROFILE = "/api/user/update-profile"
    UPDATE_PASSWORD = "/api/user/update-password"
    FIND_ONE = "/api/user/find-one"
    FORGOT_PASSWORD = '/api/user/forgot-password'
    CREATE_COURSE = '/api/user/create-course'
    CREATE_LESSION = '/api/user/create-lession'
    UPDATE_COURSE = '/api/user/update-course' 
    UPDATE_LESSION = '/api/user/update-lession'
    GET_ALL_COURSES = '/api/user/get-all-courses'
    GET_ONE_COURSE = '/api/user/get-one-course'
    GET_ALL_LESSIONS = '/api/user/get-all-lessions'
    GET_ONE_LESSION = '/api/user/get-one-lession'
    DELETE_ONE_COURSE = '/api/user/delete-one-course'
    DELETE_ONE_LESSION = '/api/user/delete-one-lession'
    CREATE_STATUS = '/api/user/create-status'
    GET_STATUS = '/api/user/get-status'

class ReportAPI:
    pass


class AdminAPI:
    GET_ONE_USER = "/api/admin/get-one-user"
    GET_ALL_USER = "/api/admin/get-all-user"


class SearchAPI:
    SEARCH = "/api/search"


class FollowAPI:
    SUBCRIBE = "/api/follow/subcribe"
    GET_FOLLOWERS = "/api/follow/get-followers"
    GET_MIN_FOLLOWERS = "/api/follow/get-min-followers"


class CommentAPI:
    CREATE_COMMENT = "/api/comment/create"
    GET_COMMENTS = "/api/comment/get-comments"


class NotificationAPI:
    GET_NOTIFICATIONS = '/api/user/notifications'
    READ_NOTIFICATION = '/api/user/read-notification'


# class

ALLOW_ALL = ["*"]

API_PERMISSION = {
    UserAPI.LOGIN: ALLOW_ALL,
    UserAPI.REGISTER: ALLOW_ALL,
    UserAPI.PROFILE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.UPDATE_PASSWORD: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.UPDATE_PROFILE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.CREATE_STATUS: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.GET_STATUS: ALLOW_ALL,
    UserAPI.FIND_ONE: ALLOW_ALL,
    UserAPI.FORGOT_PASSWORD: ALLOW_ALL,
    UserAPI.CREATE_COURSE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.CREATE_LESSION: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.UPDATE_COURSE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.UPDATE_LESSION: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    UserAPI.GET_ALL_COURSES: ALLOW_ALL,
    UserAPI.GET_ONE_COURSE: ALLOW_ALL,
    UserAPI.GET_ALL_LESSIONS: ALLOW_ALL,
    UserAPI.GET_ONE_LESSION: ALLOW_ALL,
    AdminAPI.GET_ONE_USER: ALLOW_ALL,
    AdminAPI.GET_ALL_USER: [Role.ADMIN],
    SearchAPI.SEARCH: ALLOW_ALL,
    FollowAPI.SUBCRIBE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    FollowAPI.GET_FOLLOWERS: ALLOW_ALL,
    FollowAPI.GET_MIN_FOLLOWERS: ALLOW_ALL,
    CommentAPI.CREATE_COMMENT: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    CommentAPI.GET_COMMENTS: ALLOW_ALL,
    NotificationAPI.GET_NOTIFICATIONS: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
    NotificationAPI.READ_NOTIFICATION: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
}
