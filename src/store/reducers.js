import {combineReducers} from 'redux'
import {authReducer} from "./auth/reducers";
import {configReducer} from "./config/reducers";
import {ordersReducer} from "./orders/reducers";

export default combineReducers({
    auth: authReducer,
    config: configReducer,
    orders: ordersReducer,
});
