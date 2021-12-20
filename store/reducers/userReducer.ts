import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
    user: null,
    error: null
}
export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
            return {...state, user: action.payload}
        case UserActionTypes.FETCH_USER_ERROR:
            return {...state, error: action.payload}
        case UserActionTypes.FETCH_USER_LOGOUT:
            return {user: null, error: null}
        default:
            return state;
    }
}