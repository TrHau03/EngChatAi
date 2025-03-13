import { combineReducers } from "redux"
import appReducer from "./reducers/App/appSlice"
import chatReducer from "./reducers/Chat/chatSlice"
export const rootReducer = combineReducers({
    app: appReducer,
    chat: chatReducer,
})
