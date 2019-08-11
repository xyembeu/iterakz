import axios from 'axios';
import {customHistory} from '../../history';

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';


export const getProfile = () => {
    return (dispatch) => {
        axios.get(`http://task01.softlab.kz/data/control/employee/profile`)
            .then(({data}) => {
                dispatch({type: PROFILE_SUCCESS, payload: data});
            });
    };
};

export const getAuthToken = ({username, password}) => {
    return (dispatch) => {
        axios
            .post('http://task01.softlab.kz/data/control/employee/token', {
                username: username,
                password: password,
            })
            .then(({data: {secretKey}}) => {
                axios.defaults.headers.common['X-Auth-Token'] = secretKey;

                localStorage.setItem('secretKey', secretKey);
                dispatch({type: AUTH_SUCCESS, payload: secretKey});
                customHistory.push('/');
            })
            .catch(error => {
                dispatch({type: AUTH_ERROR, payload: 'Неверный логин или пароль!'});
            });
    };
};


export const logout = () => {
    return (dispatch) => {
        delete axios.defaults.headers.common['X-Auth-Token'];
        localStorage.removeItem('secretKey');
        dispatch({type: PROFILE_SUCCESS, payload: {}});
        dispatch({type: AUTH_SUCCESS, payload: ''});
    }
};

