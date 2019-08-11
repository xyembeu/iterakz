import axios from 'axios';
import queryString from 'query-string';

import {customHistory} from '../../history';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';


export const getOrder = (id) => {
    return (dispatch) => {
        axios
            .get(`http://task01.softlab.kz/data/control/orders/a/order/${id}`)
            .then(({data}) => {
                dispatch({type: ORDER_SUCCESS, payload: data});
            });
    };
};

export const setOrder = (id) => {
    return () => {
        const queryParams = queryString.parse(customHistory.location.search);
        let nextQueryParams = {...queryParams, modalId: id};
        customHistory.push(`/?${queryString.stringify(nextQueryParams)}`);
    };
};

export const clearOrder = () => {
    return (dispatch) => {
        const queryParams = queryString.parse(customHistory.location.search);
        delete queryParams.modalId;
        let nextQueryParams = {...queryParams};
        customHistory.push(`/?${queryString.stringify(nextQueryParams)}`);
        dispatch({type: ORDER_SUCCESS, payload: {}});
    };
};
