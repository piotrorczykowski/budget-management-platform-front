import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const { dispatch }: { dispatch: any } = useAuthContext()

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')

        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}
