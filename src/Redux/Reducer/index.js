import {combineReducers} from "redux"
import todoReducer from "./todoReducer"
import userReducer from "./userReducer"

const allReducer = combineReducers({
    user: userReducer,
    todo: todoReducer
}) 

export default allReducer