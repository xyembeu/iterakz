import { combineReducers } from 'redux';

import { authReducer } from './auth/reducers';
import { configReducer } from './config/reducers';
import { ordersReducer } from './orders/reducers';
import { orderReducer } from './order/reducers';

export default combineReducers({
  auth: authReducer,
  config: configReducer,
  orders: ordersReducer,
  order: orderReducer,
});
