import React, {Component} from 'react';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import {getOrders, setFilter, setPagination} from '../../store/orders/actions';
import {setOrder} from '../../store/order/actions';
import {connect} from 'react-redux';

import isEqual from "lodash.isequal";
import includes from "lodash.includes";

import OrderList from '../../components/OrderList/OrderList';
import OrderFilter from '../../components/OrderFilter/OrderFilter';
import Box from '../Box/Box';
import Pagination from '../../components/UI/Pagination/Pagination';
import OrderModal from "../OrderModal/OrderModal";


const ITEMS_PER_PAGE = 10;

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders();
    }

    openModal = (id) => {
        this.props.setOrder(id);
    };

    onPaginate = number => {
        this.props.setPagination(number);
    };

    render() {
        const {data, dataByPage, currentPage, cities, setFilter, filters} = this.props;

        return (
            <>
                <Box title={'Фильтр'} toggle={true}>
                    <OrderFilter
                        cities={cities}
                        setFilter={setFilter}
                        filtersFromRoute={filters}
                    />
                </Box>
                <Box title={'Заказы'}>
                    <OrderList
                        data={dataByPage}
                        cities={cities}
                        onPaginate={this.onPaginate}
                        openModal={this.openModal}
                        closeModal={this.closeModal}
                    />
                </Box>
                <OrderModal/>
                <div className="row">
                    <div className="col">
                        <div className={'orders__count'}>
                            Всего заказов: <b>{data.length}</b>
                        </div>
                    </div>
                    <div className="col">
                        <Pagination
                            count={data.length}
                            by={ITEMS_PER_PAGE}
                            current={currentPage}
                            onPaginate={this.onPaginate}
                        />
                    </div>
                </div>
            </>
        );
    }
}

const dispatchStateToProps = {
    getOrders,
    setOrder,
    setFilter,
    setPagination,
};

const mapStateToProps = (store, ownProps) => {
    const {orders: {data}, config: {cities}} = store;

    const filters = queryString.parse(ownProps.history.location.search);
    const page = filters.page || 1;

    delete filters.page;
    delete filters.modalId;


    const filterData = (data, filters) => {
        if (!data.length) {
            return [];
        }

        const filtersKeys = Object.keys(filters);

        return data.filter(item => {
            return filtersKeys.every(f => {
                if (f.charAt(0) === '_') {
                    return isEqual(item[f.slice(1)].toString(), filters[f]);
                } else {
                    return includes(item[f].toString().toLowerCase(), filters[f].toLowerCase());
                }
            });
        });
    };

    const filteredData = filterData(data, filters);

    const dataByPage = filteredData.slice(
        ITEMS_PER_PAGE * (page - 1),
        ITEMS_PER_PAGE * page
    );

    return {
        data: filterData(data, filters),
        dataByPage,
        currentPage: + page || 1,
        cities,
        filters
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        dispatchStateToProps
    )(Orders)
);
