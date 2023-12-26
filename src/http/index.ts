import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:3003'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:3003'
})

const authInterceptor = (config:any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}