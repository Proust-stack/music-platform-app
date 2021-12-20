export interface IUser {
    email: string;
    id: string;
}

export interface UserState {
    user: IUser | null;
    error: object;
}

export enum UserActionTypes {
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
    FETCH_USER_LOGOUT = 'FETCH_USER_LOGOUT',
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
    payload: IUser;
}
interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: object;
}
interface FetchUserLogoutAction {
    type: UserActionTypes.FETCH_USER_LOGOUT;
}

export type UserAction = FetchUserAction | FetchUserErrorAction | FetchUserLogoutAction;