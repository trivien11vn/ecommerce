import axios from '../axios'
export const apiGetProduct = (params) => axios({
    url: '/product',
    method: 'get',
    params
})

export const apiGetOneProduct = (pid) => axios({
    url: '/product/'+pid,
    method: 'get',
})