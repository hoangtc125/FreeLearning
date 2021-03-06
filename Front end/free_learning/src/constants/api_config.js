export let DOMAIN = "http://0.0.0.0:1234"
export let LOGIN = '/user/login'
export let REGISTER = "/user/register"
export let PROFILE = "/user/me"
export let UPDATE_PROFILE = "/user/update-profile"
export let UPDATE_PASSWORD = "/user/update-password"
export let FIND_ONE = "/user/find-one?id="
export let GET_ONE_USER = '/admin/get-one-user'
export let GET_ALL_USER = '/admin/get-all-user'
export let SEARCH = '/search'
export let SUBCRIBE = '/follow/subcribe?publisher='
export let GET_FOLLOWERS = '/follow/get-followers?username='
export let GET_MIN_FOLLOWERS = '/follow/get-min-followers?username='
export let FORGOT_PASSWORD = '/user/forgot-password?email='
export let CREATE_LESSION = '/user/create-lession'
export let GET_ONE_LESSION = '/user/get-one-lession?lession_id='
export let CREATE_COMMENT = "/comment/create"
export let GET_COMMENTS = "/comment/get-comments?blog_id="
export let GET_NOTIFICATIONS = '/user/notifications?user_id='
export let READ_NOTIFICATION = '/user/read-notification?notification_id='
export let GET_ALL_LESSONS = '/user/get-all-lessions?username='
export let DELETE_LESSON = '/user/delete-one-lession?lession_id='
export let UPDATE_LESSION = '/user/update-lession'
export let CREATE_STATUS = '/user/create-status'
export let GET_STATUS = '/user/get-status?user_id='