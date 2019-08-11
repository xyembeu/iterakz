import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { STATUS_IDS, timestampToDate } from '../../helpers';

import Table from "../UI/Table/Table";

export default class OrderList extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        cities: PropTypes.array.isRequired,
        openModal: PropTypes.func.isRequired
    };

    render() {
        const {data, cities, openModal} = this.props;

        const renderList = data.map(({id, statusId, cityId, number, deliveryGeneralData, deliveryDate, customerName, tsCreated}, index) => {
           const status =  STATUS_IDS.find(item => item.id === statusId);
           const city =  cities.find(item => item.id === cityId);
                 return (
                <tr key={id}>
                    <td>
                        <div className={'badge badge-primary'}>{status['name']} </div>
                    </td>
                    <td>№{number}<br/>Создан {timestampToDate(tsCreated)}</td>
                    <td>
                        г.{city['name']}
                        <br/>
                        {deliveryGeneralData}
                    </td>
                    <td>{deliveryDate}</td>
                    <td>{customerName}</td>
                    <td>
                        <button className={'btn btn-w-m btn-default'} onClick={() => openModal(id)}>
                            Изменить
                        </button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <Table>
                    <tbody>
                    {renderList}
                    </tbody>
                </Table>
            </div>
        )
    }
}

