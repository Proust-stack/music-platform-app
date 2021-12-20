import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { trackReducer } from "./trackReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
    user: userReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, 
        ...action.payload, 
      }
      return nextState
    } else {
      return rootReducer(state, action)
    }
  }
  

export type RootState = ReturnType<typeof rootReducer>