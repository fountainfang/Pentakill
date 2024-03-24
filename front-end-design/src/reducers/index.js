import { combineReducers } from "redux";
import Flash from "./Flash";
import auth from "./auth"

const rootReducer = combineReducers({
    Flash,
    auth
})

export default rootReducer 