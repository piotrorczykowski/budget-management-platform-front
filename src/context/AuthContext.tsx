import { createContext, useEffect, useReducer } from 'react'
import { Action, ActionType } from './@types'

export const AuthContext = createContext<null>(null)

export const authReducer = (state: any, action: Action) => {
    switch (action.type) {
        case ActionType.LOGIN:
            return { accessToken: action.payload }
        case ActionType.LOGOUT:
            return { accessToken: null }
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
            dispatch({ type: ActionType.LOGIN, payload: accessToken })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
