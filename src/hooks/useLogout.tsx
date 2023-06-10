import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const { dispatch }: { dispatch: any } = useAuthContext()

    const logout = () => {
        localStorage.removeItem('accessToken')

        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}
