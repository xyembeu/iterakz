import { PROFILE_SUCCESS, AUTH_ERROR, AUTH_REQUEST, AUTH_SUCCESS } from './actions';

const defaultState = {
  secretKey: '',
  profile: {},
  isLoading: false,
  error: '',
};

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        secretKey: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};
