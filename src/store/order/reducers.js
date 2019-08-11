import { ORDER_SUCCESS, ORDER_REQUEST, ORDER_ERROR } from './actions';

const defaultState = {
  data: {},
  isLoadig: false,
  error: '',
};

export const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
        isLoadig: true
      };

    case ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
