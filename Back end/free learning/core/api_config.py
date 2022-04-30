from core.constants import Role

class UserAPI:
  LOGIN = '/user/login'
  REGISTER = "/user/register"
  PROFILE = "/user/me"
  UPDATE_PROFILE = "/user/update-profile"


class ReportAPI:
  pass


class AdminAPI:
  GET_ONE_USER = '/admin/get-one-user'
  GET_ALL_USER = '/admin/get-all-user'
  

# class

ALLOW_ALL = ['*']

API_PERMISSION = {
  UserAPI.LOGIN: ALLOW_ALL,
  UserAPI.REGISTER: ALLOW_ALL,
  UserAPI.PROFILE: Role.get_all(),
  AdminAPI.GET_ONE_USER: ALLOW_ALL,
  AdminAPI.GET_ALL_USER: [Role.ADMIN],
}
