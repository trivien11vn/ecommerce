import axios from '../axios'
export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data,
})
export const apiFinalRegister = (token) => axios({
    url: '/user/final_register/'+token,
    method: 'put',
})
export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data
})
export const apiForgotPassword = (data) => axios({
    url: '/user/forgotpassword',
    method: 'post',
    data
})
export const apiResetPassword = (data) => axios({
    url: '/user/reset_password',
    method: 'put',
    data
})
