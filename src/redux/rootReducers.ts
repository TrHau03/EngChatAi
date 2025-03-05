import { combineReducers } from "redux"
import appReducer from "./reducers/App/appSlice"
export const rootReducer = combineReducers({
    app: appReducer,
})
