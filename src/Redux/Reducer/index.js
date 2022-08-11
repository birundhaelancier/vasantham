import { combineReducers } from "redux";
import AllReducer from './allReducer'
import CartReducer from "./CartReducer";
import StoreProuct from './/StoreProuct'
export default combineReducers({
    AllReducer,
    CartReducer,
    StoreProuct
})
