import axios, { AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router'
const request = axios.create({
    baseURL: 'http://localhost:3000' + '/api',
    timeout: 30000
})

// 添加请求拦截器
request.interceptors.request.use(
    function (config:any) {
        config.headers.token = localStorage.getItem('token')
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response: AxiosResponse) => {
        const status = response?.data.code
        switch (status) {
        case 401:
            router.replace('/login')
            return {}
            break
        case 500:
            break
        case 300:
            break
        case 200:
            return response.data
        default:
            return response.data
        }
    },
    function (error) {
        message.error('请求错误' + error)
    }
)

export default request
