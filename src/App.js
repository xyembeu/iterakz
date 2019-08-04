import React, {Component} from 'react'

import {Provider} from "react-redux";
import {createStore} from 'redux'
import combineReducers from './store/reducers'

import Router from './router'
import axios from "axios";

const store = createStore(combineReducers);

if (localStorage.getItem('secretKey')) {
    axios.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('secretKey');

    store.dispatch({
        type: 'AUTH',
        payload: localStorage.getItem('secretKey')
    })
}

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

