export const ORDERS = 'ORDERS';
export const ORDERS_CURRENT_PAGE = 'ORDERS_CURRENT_PAGE';
export const ORDERS_FOR_FILTER = 'ORDERS_FOR_FILTER';
export const ORDERS_FILTER_CHANGE = 'ORDERS_FILTER_CHANGE';

export const setOrders = (data) => ({
    type: ORDERS,
    payload: data
});

export const setOrdersForFilter = (dataForFilter) => ({
    type: ORDERS_FOR_FILTER,
    payload: dataForFilter
});

export const setOrdersCurrentPage = (currentPage) => ({
    type: ORDERS_CURRENT_PAGE,
    payload: currentPage
});

export const setOrdersFilter = (form) => ({
    type: ORDERS_FILTER_CHANGE,
    payload: form
});

