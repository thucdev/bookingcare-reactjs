import actionTypes from './actionTypes'

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
})

<<<<<<< HEAD
export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
})

=======
>>>>>>> react-server
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
})
<<<<<<< HEAD
=======

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
})
>>>>>>> react-server
