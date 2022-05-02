from core.constants import Role

class UserAPI:
  LOGIN = '/user/login'
  REGISTER = "/user/register"
  PROFILE = "/user/me"
  UPDATE_PROFILE = "/user/update-profile"
  UPDATE_PASSWORD = "/user/update-password"
  FIND_ONE = "/user/find-one"


class ReportAPI:
  pass


class AdminAPI:
  GET_ONE_USER = '/admin/get-one-user'
  GET_ALL_USER = '/admin/get-all-user'
  

class SearchAPI:
  SEARCH = '/search'

# class

ALLOW_ALL = ['*']

API_PERMISSION = {
  UserAPI.LOGIN: ALLOW_ALL,
  UserAPI.REGISTER: ALLOW_ALL,
  UserAPI.PROFILE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
  UserAPI.UPDATE_PASSWORD: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
  UserAPI.UPDATE_PROFILE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
  UserAPI.FIND_ONE: [Role.STUDENT, Role.ADMIN, Role.TEACHER, Role.SCHOOL],
  AdminAPI.GET_ONE_USER: ALLOW_ALL,
  AdminAPI.GET_ALL_USER: [Role.ADMIN],
  SearchAPI.SEARCH: ALLOW_ALL,
}
