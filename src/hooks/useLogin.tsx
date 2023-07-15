import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { AxiosResponse } from 'axios'
import { sendPost } from '../api/axios'
import { showErrorToast } from '../utils/toastUtils'
import { ENDPOINTS } from '../api'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch }: { dispatch: any } = useAuthContext()

    const login = async (username: string, password: string) => {
        setIsLoading(true)

        try {
            const res: AxiosResponse = await sendPost(ENDPOINTS.signIn, {
                username,
                password,
            })

            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('userId', res.data.userId)

            dispatch({ type: 'LOGIN', payload: res.data.accessToken })
            setIsLoading(false)
        } catch (e: unknown) {
            setIsLoading(false)
            showErrorToast('User not found!')
        }
    }

    return { login, isLoading }
}
