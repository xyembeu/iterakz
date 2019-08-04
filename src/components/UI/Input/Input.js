import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
    static defaultProps = {
        errorMessage: 'Введите данные'
    };
    static propTypes = {
        valid: PropTypes.bool,
        required: PropTypes.bool,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string.isRequired,
        errorMessage: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const {placeholder,type, label, value, required, valid, touched, errorMessage, onChange} = this.props;

        const renderError = (required && !valid && touched) ? <div style={{color:'red'}}>{errorMessage}</div> : null;

        const inputType = type?type:'text';
        return (
            <div className="form-group">
                {label ? <label><b>{label}</b></label> : null}
                <input type={inputType} className={'form-control'} placeholder={placeholder} value={value}
                       onChange={onChange}/>
                {renderError}
            </div>
        )
    }
}