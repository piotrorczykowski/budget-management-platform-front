import { createContext, useEffect, useReducer } from 'react'

type Action = { type: 'LOGIN'; payload: any } | { type: 'LOGOUT' }

export const AuthContext = createContext(null)

export const authReducer = (state: any, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({
    children,
}: {
    children: JSX.Element
}): JSX.Element => {
    const [state, dispatch] = useReducer(authReducer, {
        accessToken: null,
    })

    useEffect(() => {
        const accessToken: string = localStorage.getItem(
            'accessToken'
        ) as string

        if (accessToken) {
            dispatch({ type: 'LOGIN', payload: accessToken })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
