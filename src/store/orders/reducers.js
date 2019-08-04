import {ORDERS} from './actions';
import {ORDERS_FOR_FILTER} from './actions';
import {ORDERS_CURRENT_PAGE} from './actions';
import {ORDERS_FILTER_CHANGE} from './actions';

const defaultState = {
    data: [],
    dataForFilter: [],
    currentPage: 1,
    form: {
        id: '',
        statusId: '',
        customerPhone: '',
        cityId: '',
        deliveryGeneralData: '',
        tsCreated: ''
    }
};

export const ordersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ORDERS:
            return {
                ...state,
                data: action.payload
            };
        case ORDERS_FOR_FILTER:
            return {
                ...state,
                dataForFilter: action.payload
            };
        case ORDERS_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case ORDERS_FILTER_CHANGE:
            return {
                ...state,
                form: action.payload
            };
        default:
            return state;
    }
};