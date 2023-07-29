import axios, { AxiosInstance } from 'axios'

const jwtToken: string = localStorage.getItem('accessToken') as string

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        authorization: `Bearer ${jwtToken}`,
    },
})

export const sendGet = async (url: string) => {
    const jwtToken: string = localStorage.getItem('accessToken') as string

    return await api.get(url, {
        headers: {
            authorization: `Bearer ${jwtToken}`,
        },
    })
}

export const sendPost = async (url: string, body: any) => {
    const jwtToken: string = localStorage.getItem('accessToken') as string

    return await api.post(url, body, {
        headers: {
            authorization: `Bearer ${jwtToken}`,
        },
    })
}

export const sendPut = async (url: string, body: any) => {
    const jwtToken: string = localStorage.getItem('accessToken') as string

    return await api.put(url, body, {
        headers: {
            authorization: `Bearer ${jwtToken}`,
        },
    })
}

export const sendDelete = async (url: string) => {
    const jwtToken: string = localStorage.getItem('accessToken') as string

    return await api.delete(url, {
        headers: {
            authorization: `Bearer ${jwtToken}`,
        },
    })
}

export default api
