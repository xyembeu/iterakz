import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { STATUS_IDS, timestampToDate } from '../../helpers';

import Select from "../UI/Select/Select";

class OrderDetail extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        cities: PropTypes.array.isRequired
    };

    onChange = (e, field) => {
        console.log(e)
    };


    render() {
        const {data:{statusId, cityId, customerName, customerPhone, customerComment, tsCreated, items, comments, delivery,sumPrice, toPay, totalPrice}, cities} = this.props;
        const renderCart = items.map(({id, title, price, quantity, imageUrls}) => {
            return (
                <li key={id}><img src={imageUrls[0]} width={'30'} height={'30'} alt={title}/>/ {title} / {+price}тг / {+quantity}шт</li>
            )
        });

        const renderComments = comments && comments.map(({authorId, message}, index) => {
            return (
                <li key={index}>{message}</li>
            )
        });

        return (
            <div>
                <b className="mb-3">Создан {timestampToDate(tsCreated)}</b>
                <Select value={statusId} options={STATUS_IDS} placeholder={'Статус заказа'} label={'Статус заказа'}
                        onChange={(e) => this.onChange(e, 'statusId')}/>
                <Select value={cityId} options={cities} placeholder={'Город'} label={'Город'}
                        onChange={(e) => this.onChange(e, 'cityId')}/>
                <div className="mb-1"><b>Имя:</b> {customerName}</div>
                <div className="mb-1"><b>Телефон:</b> {customerPhone}</div>
                {customerComment?<div className="mb-3"><b>Комментарий клиента:</b> {customerComment}</div>:null}
                <hr/>
                <div className="mb-3"><b>Доставка</b></div>
                <div className="mb-1"><b>Адрес:</b> ул.{delivery.data.street} {delivery.data.house} {delivery.data.floor}</div>
                {customerComment?<div className="mb-3"><b>Дата/время:</b> {delivery.data.deliveryDate} {delivery.data.deliveryTime}</div>:null}
                <hr/>
                <div className="mb-3"><b>Корзина</b></div>
                <ul>
                    {renderCart}
                </ul>
                <hr/>
                <hr/>
                <div className="mb-3"><b>Комментарии</b></div>
                <ul>
                    {comments?renderComments:<li>Нет комментариев</li>}
                </ul>
                <hr/>
                <div className="mb-3"><b>Оплата</b></div>
                <div className="mb-1"><b>Сумма заказа:</b> {+sumPrice}тг</div>
                <div className="mb-1"><b>Сумма к оплате:</b> {+toPay}тг</div>
                <div className="mb-3"><b>Итоговая сумма заказа:</b> {+totalPrice}тг</div>
                <hr/>
            </div>
        )
    }
}

export default withRouter(OrderDetail);
