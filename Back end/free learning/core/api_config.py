from core.constants import Role


class UserAPI:
    LOGIN = "/user/login"
    REGISTER = "/user/register"
    PROFILE = "/user/me"
    UPDATE_PROFILE = "/user/update-profile"
    UPDATE_PASSWORD = "/user/update-password"
    FIND_ONE = "/user/find-one"
    FORGOT_PASSWORD = '/user/forgot-password'
    CREATE_COURSE = '/user/create-course'
    CREATE_LESSION = '/user/create-lession'
    UPDATE_COURSE = '/user/update-course' 
    UPDATE_LESSION = '/user/update-lession'
    GET_ALL_COURSES = '/user/get-all-courses'
    GET_ONE_COURSE = '/user/get-one-course'
    GET_ALL_LESSIONS = '/user/get-all-lessions'
    GET_ONE_LESSION = '/user/get-one-lession'
    DELETE_ONE_COURSE = '/user/delete-one-course'
    DELETE_ONE_LESSION = '/user/delete-one-lession'
    CREATE_STATUS = '/user/create-status'
    GET_STATUS = '/user/get-status'

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
    GET_MIN_FOLLOWERS = "/follow/get-min-followers"


class CommentAPI:
    CREATE_COMMENT = "/comment/create"
    GET_COMMENTS = "/comment/get-comments"


class NotificationAPI:
    GET_NOTIFICATIONS = '/user/notifications'
    READ_NOTIFICATION = '/user/read-notification'


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
