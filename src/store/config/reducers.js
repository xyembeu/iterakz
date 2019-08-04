import {CITIES} from './actions';

const defaultState = {
    cities: []
};

export const configReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CITIES:
            return {
                ...state,
                cities: action.payload
            }
        default:
            return state;
    }
};