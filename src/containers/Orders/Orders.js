import React, {Component} from 'react'

import OrderList from '../../components/OrderList/OrderList'
import OrderFilter from '../../components/OrderFilter/OrderFilter'
import Box from "../Box/Box";

import {withRouter} from "react-router-dom";

export default class Orders extends Component {

    render() {
        return (
            <>
                <Box title={'Фильтр'} toggle={true}>
                    <OrderFilter/>
                </Box>
                <Box title={'Заказы'}>
                    <OrderList/>
                </Box>
            </>
        )
    }
}

 withRouter(Component);