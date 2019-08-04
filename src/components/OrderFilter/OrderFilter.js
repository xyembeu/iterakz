import React, {Component} from 'react';

import {connect} from "react-redux";
import {setOrders, setOrdersFilter, setOrdersCurrentPage} from "../../store/orders/actions";


import Input from '../UI/Input/Input';
import Select from "../UI/Select/Select";

class OrderFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: true
        }

    }

    onFilterChange = (e, field) => {
        const form = {...this.props.form};

        form[field] = e.target.value;

        if (form[field].trim() !== '') {
            this.setState({
                disabled: false
            });
        }

        this.props.setOrdersFilter(form);
    };

    filterData = (data) => {
        const {form} = this.props;

        let filter = data.filter((item) => {
            for (let key in form) {
                if (form.hasOwnProperty(key) && form[key].trim() !== '' && !item[key].toString().includes(form[key]))
                    return false;
            }
            return true;
        });


        if (filter.length === data.length) {
            this.setState({
                disabled: true
            });
        }

        this.props.setOrders(filter)
        this.props.setOrdersCurrentPage(1)

    };

    onReset = () => {
        const form = {...this.props.form}
        for (let key in form) {
            if (form.hasOwnProperty(key)) {
                form[key] = '';
            }
        }

        this.props.setOrdersFilter(form);
        this.props.setOrders(this.props.dataForFilter)
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.filterData(this.props.dataForFilter)
    };

    render() {

        const {form: {id, statusId, customerPhone, cityId, deliveryGeneralData}, cities} = this.props;

        const statusIds = [
            {id: 0, name: 'Отменен'},
            {id: 10, name: 'Новый'},
            {id: 20, name: 'Принят'},
            {id: 30, name: 'Подготавливается'},
            {id: 50, name: 'Доставляется'},
            {id: 55, name: 'Доставлен'},
            {id: 60, name: 'Доступен'},
            {id: 100, name: 'Выполнен'}
        ];

        return (
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-4">
                        <Input placeholder={'id заказа'} value={id} label={'id заказа'}
                               onChange={(event) => this.onFilterChange(event, 'id')}/>
                    </div>
                    <div className="col-4">
                        <Select value={statusId} options={statusIds} placeholder={'Статус заказа'}
                                label={'Статус заказа'}
                                onChange={(e) => this.onFilterChange(e, 'statusId')}/>
                    </div>
                    <div className="col-4">
                        <Input placeholder={'Номер телефона'} value={customerPhone} label={'Номер телефона'}
                               onChange={(event) => this.onFilterChange(event, 'customerPhone')}/>
                    </div>
                    <div className="col-4">
                        <Select value={cityId} options={cities} placeholder={'Город'} label={'Город'}
                                onChange={(e) => this.onFilterChange(e, 'cityId')}/>
                    </div>
                    <div className="col-4">
                        <Input placeholder={'Адрес'} value={deliveryGeneralData} label={'Адрес'}
                               onChange={(event) => this.onFilterChange(event, 'deliveryGeneralData')}/>
                    </div>
                </div>
                <div className="text-center">
                    <button
                        disabled={`${this.state.disabled ? 'disabled' : ''}`}
                        className={'btn btn-w-m btn-default mx-xl-3'} onClick={() => this.onReset()}>
                        Сбросить
                    </button>
                    <button
                        disabled={`${this.state.disabled ? 'disabled' : ''}`}
                        className={'btn btn-w-m btn-primary'}>
                        Применить
                    </button>
                </div>
            </form>
        )
    }
}

const dispatchStateToProps = {
    setOrders,
    setOrdersCurrentPage,
    setOrdersFilter,
};

const mapStateToProps = ({orders: {dataForFilter, form}, config: {cities}}) => {
    return {
        dataForFilter,
        form,
        cities
    }
};

export default connect(mapStateToProps, dispatchStateToProps)(OrderFilter);