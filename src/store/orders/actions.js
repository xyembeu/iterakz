import axios from 'axios';
import queryString from 'query-string';
import pickBy from 'lodash.pickby';
import identity from 'lodash.identity';

import { customHistory } from '../../history';

export const ORDERS_REQUEST = 'ORDERS_REQUEST';
export const ORDERS_SUCCESS = 'ORDERS_SUCCESS';
export const ORDERS_ERROR = 'ORDERS_ERROR';

export const getOrders = () => {
  return (dispatch) => {
    axios
      .get(`http://task01.softlab.kz/data/control/orders/a/active/list/`)
      .then(({ data }) => {

        dispatch({ type: ORDERS_SUCCESS, payload: data });
      });
  };
};

export const setFilter = filtersRrr => {
  return () => {
      const filters = {...filtersRrr}

    delete filters.page;
    delete filters.modalId;

    const cleanedFilters = pickBy(filters, identity);
    const queryParams = queryString.stringify(cleanedFilters);

    if (!Object.keys(cleanedFilters).length) {
      customHistory.push(`/`);
      return;
    }

    customHistory.push(`/?${queryParams}&page=1`);
  };
};

export const setPagination = number => {
  return () => {
    const queryParams = queryString.parse(customHistory.location.search);

    let nextQueryParams = { ...queryParams, page: number };

    customHistory.push(`/?${queryString.stringify(nextQueryParams)}`);
  };
};
