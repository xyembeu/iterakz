import { ORDERS_SUCCESS, ORDERS_REQUEST, ORDERS_ERROR } from './actions';

const defaultState = {
  data: [],
  isLoadig: false,
  error: '',
};

export const ordersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ORDERS_REQUEST:
      return {
        ...state,
        isLoadig: true,
        error: '',
      };

    case ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case ORDERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
