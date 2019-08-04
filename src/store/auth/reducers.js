import {AUTH} from './actions';
import {PROFILE} from './actions';

const defaultState = {
    secretKey: '',
    profile: {}
};

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH:
            return {
                ...state,
                secretKey: action.payload
            };
        case PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        default:
            return state;
    }
};