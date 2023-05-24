export type Action = { type: ActionType; payload: string } | { type: 'LOGOUT' }

export enum ActionType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}
