import React, {Component} from 'react';
import axios from 'axios';
import Select from "../UI/Select/Select";

import {connect} from "react-redux";

class OrderDetail extends Component {

    state = {
        statusId: '',
        cityId: '',
        customerPhone: '',
        customerName: '',
        tsCreated: '',
        delivery: {
            street: '',
            house: '',
            floor: ''
        },
        items: [],
        loading: true
    };

    componentDidMount() {
        const {id} = this.props;

        axios.get(`http://task01.softlab.kz/data/control/orders/a/order/${id}`)
            .then(({data: {statusId, cityId, customerPhone, customerName, tsCreated, items, delivery: {data: {street, house, floor}}}}) => {

                const delivery = {...this.state.delivery};
                delivery.street = street;
                delivery.house = house;
                delivery.floor = floor;

                this.setState({
                    statusId,
                    cityId,
                    customerPhone,
                    customerName,
                    tsCreated,
                    items,
                    delivery,
                    loading:false
                })
            });
    }

    onChange = (e, field) => {
        console.log(e)
    };


    render() {
        const {loading, statusId, cityId, customerName, customerPhone, tsCreated, items, delivery: {street, house, floor}} = this.state;
        const {cities} = this.props;

        const timestampToDate = (timestamp) => {
            var date = new Date();
            date.setTime(timestamp * 1000);
            return date.getHours() + ':' + date.getMinutes() + ' ' + ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
        };

        const statusIds = [
            {id:0, name:'Отменен'},
            {id:10, name:'Новый'},
            {id:20, name:'Принят'},
            {id:30, name:'Подготавливается'},
            {id:50, name:'Доставляется'},
            {id:55, name:'Доставлен'},
            {id:60, name:'Доступен'},
            {id:100, name:'Выполнен'}
        ];


        const renderDetailItems = items.map(({id, title}) => {
            return (
                <li key={id}>{title}</li>
            )
        });

        const renderLoading = () =>{
            return(
                <b>Loading...</b>
            )
        };

        const renderDetail = () => {
            return (
                <div>
                    <b className="mb-3">Создан {timestampToDate(tsCreated)}</b>
                    <Select value={statusId} options={statusIds} placeholder={'Статус заказа'} label={'Статус заказа'}
                            onChange={(e) => this.onChange(e, 'statusId')}/>
                    <Select value={cityId} options={cities} placeholder={'Город'} label={'Город'}
                            onChange={(e) => this.onChange(e, 'cityId')}/>
                    <div className="mb-1"><b>Имя:</b> {customerName}</div>
                    <div className="mb-1"><b>Телефон:</b> {customerPhone}</div>
                    <div className="mb-3"><b>Адрес:</b> ул.{street} {house}/{floor}</div>
                    <b>Список</b>
                    <ul>
                        {renderDetailItems}
                    </ul>
                </div>
            )
        };

        const renderData = !loading ? renderDetail(): renderLoading();

        return (
          <div>
              {renderData}
          </div>
        )
    }
}

const mapStateToProps = ({config:{cities}}) => {
    return {
        cities
    }
};

export default connect(mapStateToProps)(OrderDetail);