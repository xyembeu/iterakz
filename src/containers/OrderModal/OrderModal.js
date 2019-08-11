import React, {Component} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import {getOrder, clearOrder} from '../../store/order/actions';

import {connect} from 'react-redux';

import isEmpty from 'lodash.isempty';

import OrderDetail from '../../components/OrderDetail/OrderDetail';
import Modal from '../../components/UI/Modal/Modal';


class OrderModal extends Component {

    static propTypes = {
        getOrder: PropTypes.func.isRequired,
        clearOrder: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        cities: PropTypes.array.isRequired,
        modalId: PropTypes.string
    };

    componentDidMount() {
        const {modalId, getOrder} = this.props;
        if (modalId) {
            getOrder(modalId);
        }
    };

    componentDidUpdate(prevProps) {
        const {modalId, getOrder} = this.props;
        if (modalId && prevProps.modalId !== modalId) {
            getOrder(modalId);
        }
    };

    closeModal = () => {
        this.props.clearOrder()
    };

    render() {
        const {data, cities, isOpen} = this.props;

        const renderModal = isOpen && !isEmpty(data) ? (
            <Modal visible={isOpen} title={'Подробная страница заказа'} onClose={this.closeModal}>
                <OrderDetail data={data} cities={cities}/>
            </Modal>
        ) : null;

        return (
            <>
                {renderModal}
            </>
        );
    }
}

const dispatchStateToProps = {
    getOrder,
    clearOrder
};

const mapStateToProps = (store, ownProps) => {
    const {order: {data}, config: {cities}} = store;

    const queryParams = queryString.parse(ownProps.history.location.search);

    const modalId = queryParams.modalId;

    const isOpen = !!modalId;

    return {
        data,
        cities,
        modalId,
        isOpen
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        dispatchStateToProps
    )(OrderModal)
);
