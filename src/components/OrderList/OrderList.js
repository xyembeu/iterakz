import React, {Component} from 'react';

import {connect} from "react-redux";

import {setOrders, setOrdersCurrentPage, setOrdersForFilter} from "../../store/orders/actions";
import axios from "axios";

import Modal from "../UI/Modal/Modal"
import OrderDetail from "../OrderDetail/OrderDetail"
import Pagination from "../UI/Pagination/Pagination";
import Table from "../UI/Table/Table";

class OrderList extends Component {

    state = {
        modal: false,
        modalTitle: '',
        detail: null,
    };


    componentDidMount() {
        axios.get(`http://task01.softlab.kz/data/control/orders/a/active/list/`)
            .then(({data}) => {
                this.props.setOrdersForFilter(data);
                this.props.setOrders(data);
            });
    }


    openModal = (id, title) => {
        this.setState({
            modal: true,
            modalTitle: title,
            detail: id,
        });
    };

    closeModal = () => {
        this.setState({
            modal: false,
            modalTitle: '',
            detail: null
        });
    };

    onPaginate = (number) => {
        this.props.setOrdersCurrentPage(number)
    };

    render() {
        const {modal, modalTitle, detail} = this.state;
        const {data, currentPage, cities} = this.props;

        const countRecordsPage = 10;
        const indexOfLast = currentPage * countRecordsPage;
        const indexOfFirst = indexOfLast - countRecordsPage;
        const paginateData = data.slice(indexOfFirst, indexOfLast);

        const timestampToDate = (timestamp) => {
            let date = new Date();
            date.setTime(timestamp * 1000);
            return date.getHours() + ':' + date.getMinutes() + ' ' + ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
        };

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

        const getCityName = (id) => {
            let name = ''
            cities.forEach((item) => {
                if (item['id'] === id)
                    name = item['name']

            });
            return name;
        };

        const renderList = paginateData.map(({id, statusId, cityId, number, deliveryGeneralData, deliveryDate, customerName, tsCreated}) => {
            return (
                <tr key={id}>
                    <td>
                        <div className={'badge badge-primary'}>{statusIds[statusId]} </div>
                    </td>
                    <td>№{number}<br/>Создан {timestampToDate(tsCreated)}</td>
                    <td>
                        г.{getCityName(cityId)}
                        <br/>
                        {deliveryGeneralData}
                    </td>
                    <td>{deliveryDate}</td>
                    <td>{customerName}</td>
                    <td>
                        <button className={'btn btn-w-m btn-default'} onClick={() => this.openModal(id, `№${number}`)}>
                            Изменить
                        </button>
                    </td>
                </tr>
            )
        });

        const renderModal = modal ? <Modal visible={modal} title={modalTitle} onClose={this.closeModal}><OrderDetail
            id={detail}/></Modal> : null;

        return (
            <div>
                {renderModal}
                <Table>
                    <tbody>
                    {renderList}
                    </tbody>
                </Table>
                <div className="row">
                    <div className="col">
                        <div className={'orders__count'}>Всего заказов: <b>{data.length}</b></div>
                    </div>
                    <div className="col">
                        <Pagination
                            count={data.length}
                            by={countRecordsPage}
                            current={currentPage}
                            onPaginate={this.onPaginate}/>
                    </div>
                </div>
            </div>
        )
    }
}

const dispatchStateToProps = {
    setOrders,
    setOrdersCurrentPage,
    setOrdersForFilter
};

const mapStateToProps = ({orders: {data, currentPage}, config: {cities}}) => {
    return {
        data,
        currentPage,
        cities
    }
};

export default connect(mapStateToProps, dispatchStateToProps)(OrderList);
