import {CITIES_SUCCESS} from './actions';

const defaultState = {
    cities: []
};

export const configReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CITIES_SUCCESS:
            return {
                ...state,
                cities: action.payload
            }
        default:
            return state;
    }
};