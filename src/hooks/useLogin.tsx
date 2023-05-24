import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { AxiosResponse } from 'axios'
import api from '../api/axios'

export const useLogin = () => {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch }: { dispatch: any } = useAuthContext()

    const login = async (username: string, password: string) => {
        setIsLoading(true)
        setError('')

        try {
            const res: AxiosResponse = await api.post('/auth/signIn', {
                username,
                password,
            })

            localStorage.setItem('accessToken', res.data.accessToken)
            dispatch({ type: 'LOGIN', payload: res.data.accessToken })
            setIsLoading(false)
        } catch (e: unknown) {
            setIsLoading(false)
            setError('User not found!')
        }
    }

    return { login, isLoading, error }
}
