import axios, { AxiosInstance } from 'axios'

// TODO get token dynamically
const jwtToken: string = localStorage.getItem('accessToken') as string

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        authorization: `Bearer ${jwtToken}`,
    },
})

export default api
