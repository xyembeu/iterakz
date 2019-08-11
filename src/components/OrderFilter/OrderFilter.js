import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import isEqual from 'lodash.isequal';

import {STATUS_IDS} from '../../helpers';

import Input from '../UI/Input/Input';
import Select from '../UI/Select/Select';
import isEmpty from "lodash.isempty";


const initialState = {
    number: '',
    _statusId: '',
    customerPhone: '',
    _cityId: '',
    deliveryGeneralData: '',
};

const prepareFilters = filters => ({
    number: filters.number || '',
    _statusId: filters._statusId || '',
    customerPhone: filters.customerPhone || '',
    _cityId: filters._cityId || '',
    deliveryGeneralData: filters.deliveryGeneralData || '',
});

class OrderFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...prepareFilters(props.filtersFromRoute),
            isTouched: false,
        };
    }

     static propTypes = {
        cities: PropTypes.array.isRequired,
        setFilter: PropTypes.func.isRequired,
        filtersFromRoute: PropTypes.object,
    };


    componentDidUpdate(prevProps, prevState) {
        const {isTouched} = this.state;
        const {filtersFromRoute} = this.props;

        if (!isTouched && !isEqual(prevProps.filtersFromRoute, filtersFromRoute)) {
            this.setState(prev => ({
                ...prepareFilters(filtersFromRoute),
                isTouched: false,
            }));
        }
    }

    onSubmitForm = e => {
        e.preventDefault();
        this.setState(
            prev => ({
                ...prev,
                isTouched: false,
            }),
            () => this.props.setFilter(this.state)
        );
    };

    onChangeForm = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.onSubmitForm(e);
        }
    };

    resetFilter = () => {
        this.setState(initialState);
        this.props.setFilter(initialState);
    };

    changeFilter = e => {
        const target = e.currentTarget;
        const fieldName = target.dataset.name;
        const value = target.value;

        this.setState({
            [fieldName]: value,
            isTouched: true,
        });
    };

    render() {
        const {cities} = this.props;
        const {number, _statusId, customerPhone, _cityId, deliveryGeneralData, isTouched} = this.state;

        return (
            <form onSubmit={this.onSubmitForm} onKeyDown={this.onChangeForm} onChange={this.onChangeForm}>
                <div className="row">
                    <div className="col-4">
                        <Input
                            name={'number'}
                            placeholder={'номер заказа'}
                            value={number}
                            label={'номер заказа'}
                            onChange={this.changeFilter}
                        />
                    </div>
                    <div className="col-4">
                        <Select
                            name={'_statusId'}
                            value={_statusId}
                            options={STATUS_IDS}
                            placeholder={'Статус заказа'}
                            label={'Статус заказа'}
                            onChange={this.changeFilter}
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name={'customerPhone'}
                            placeholder={'Номер телефона'}
                            value={customerPhone}
                            label={'Номер телефона'}
                            onChange={this.changeFilter}
                        />
                    </div>
                    <div className="col-4">
                        <Select
                            name={'_cityId'}
                            value={_cityId}
                            options={cities}
                            placeholder={'Город'}
                            label={'Город'}
                            onChange={this.changeFilter}
                        />
                    </div>
                    <div className="col-4">
                        <Input
                            name={'deliveryGeneralData'}
                            placeholder={'Адрес'}
                            value={deliveryGeneralData}
                            label={'Адрес'}
                            onChange={this.changeFilter}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        disabled={isTouched || !isEmpty(this.props.filtersFromRoute)?'':'disabled'}
                        className={'btn btn-w-m btn-default mx-xl-3'}
                        onClick={this.resetFilter}
                        type={'button'}
                    >
                        Сбросить
                    </button>
                    <button
                        type={'submit'}
                        disabled={isTouched?'':'disabled'}
                        className={'btn btn-w-m btn-primary'}>
                        Применить
                    </button>
                </div>
            </form>
        );
    }
}

export default withRouter(OrderFilter);
