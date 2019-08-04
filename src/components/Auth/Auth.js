import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {connect} from 'react-redux';
import {setAuth} from '../../store/auth/actions'


import Input from '../UI/Input/Input';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.notFilleds = Object.keys(this.state.form);
    }

    static propTypes = {
        setAuth: PropTypes.func.isRequired
    };

    state = {
        form: {
            username: {
                value: '',
                label: '',
                placeholder: 'Логин',
                required: true,
                errorMessage: 'Введите логин',
                valid: false,
                touched: false
            },
            password: {
                value: '',
                label: '',
                placeholder: 'Пароль',
                required: true,
                errorMessage: 'Введите пароль',
                valid: false,
                touched: false
            }
        },
        error: false
    };

    onChange = (event, field) => {
        const form = {...this.state.form};
        const control = {...form[field]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.fieldValidate(field, control.required, control.value);

        form[field] = control;

        this.setState({
            form
        });
    };

    fieldValidate = (field, required, value) => {
        if (!required) {
            return true
        }
        if (required && value.trim() !== '') {
            const index = this.notFilleds.indexOf(field);
            if (index > -1) {
                this.notFilleds.splice(index, 1);
            }
            return true
        }

        this.notFilleds.push(field);
    };

    onSubmit = (e) => {
        e.preventDefault();

        const {form} = this.state;

        axios.post('http://task01.softlab.kz/data/control/employee/token', {
            username: form.username.value,
            password: form.password.value
        })
            .then(({data: {secretKey}}) => {
                axios.defaults.headers.common['X-Auth-Token'] = secretKey;
                localStorage.setItem('secretKey', secretKey);
                this.props.setAuth(secretKey);
            })
            .catch((error) => {
                this.setState({
                    error: true
                })
            });
    };


    render() {
        const {form, error} = this.state;

        const renderFields = Object.keys(form).map((key, index) => {
            const {placeholder, value, required, valid, touched, errorMessage} = form[key];
            return (

                <Input
                    key={index}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    valid={valid}
                    touched={touched}
                    errorMessage={errorMessage}
                    onChange={(event) => this.onChange(event, key)}/>

            )
        });

        return (
            <form onSubmit={this.onSubmit}>
                {renderFields}
                <div className="text-center">
                    <button disabled={this.notFilleds.length > 0 ? 'disabled' : ''}
                            className={'btn btn-primary block full-width m-b'}>Войти
                    </button>
                </div>
                {error ? <div className={'alert alert-danger'}>Неверный логин или пароль!</div> : null}
            </form>
        )
    }
}

const dispatchStateToProps = {
    setAuth
};

const mapStateToProps = ({secretKey}) => {
    return {
        secretKey
    }
};

export default connect(mapStateToProps, dispatchStateToProps)(Auth);
