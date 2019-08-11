import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import { customHistory } from './history';
import axios from 'axios';
import { AUTH_SUCCESS } from './store/auth/actions';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './store/reducers';

const store = createStore(combineReducers, applyMiddleware(thunk));

if (localStorage.getItem('secretKey')) {
  axios.defaults.headers.common['X-Auth-Token'] = localStorage.getItem(
    'secretKey'
  );

  store.dispatch({
    type: AUTH_SUCCESS,
    payload: localStorage.getItem('secretKey'),
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
