import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {getAuthToken} from '../../store/auth/actions';

import Input from '../UI/Input/Input';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.notFilleds = Object.keys(this.state.form);
    }

    static propTypes = {
        getAuthToken: PropTypes.func.isRequired,
        secretKey: PropTypes.string.isRequired,
        error: PropTypes.string.isRequired,
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
                touched: false,
                type: 'text',
            },
            password: {
                value: '',
                label: '',
                placeholder: 'Пароль',
                required: true,
                errorMessage: 'Введите пароль',
                valid: false,
                touched: false,
                type: 'password',
            },
        },
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
            return true;
        }
        if (required && value.trim() !== '') {
            const index = this.notFilleds.indexOf(field);
            if (index > -1) {
                this.notFilleds.splice(index, 1);
            }
            return true;
        }

        this.notFilleds.push(field);
    };

    onSubmit = e => {
        e.preventDefault();

        const {form:{username, password}} = this.state;
        this.props.getAuthToken({
            username: username.value,
            password: password.value,
        });
    };

    render() {
        const {form} = this.state;
        const {error} = this.props;

        const renderFields = Object.keys(form).map((key, index) => {
            const {
                placeholder, value, type, required, valid, touched, errorMessage} = form[key];
            return (
                <Input
                    key={index}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    required={required}
                    valid={valid}
                    touched={touched}
                    errorMessage={errorMessage}
                    onChange={event => this.onChange(event, key)}
                />
            );
        });


        return (
            <>
                <form onSubmit={this.onSubmit}>
                    {renderFields}
                    <div className="text-center">
                        <button
                            disabled={this.notFilleds.length > 0 ? 'disabled' : ''}
                            className={'btn btn-primary block full-width m-b'}
                        >
                            Войти
                        </button>
                    </div>
                    {error ? (
                        <div className={'alert alert-danger'}>{error}</div>
                    ) : null}
                </form>
            </>
        );
    }
}

const dispatchStateToProps = {
    getAuthToken
};

const mapStateToProps = (store) => {
    const {auth: {secretKey, error}} = store;
    return {
        secretKey,
        error
    };
};

export default connect(
    mapStateToProps,
    dispatchStateToProps
)(Auth);
