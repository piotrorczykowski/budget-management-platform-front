import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

export default api
