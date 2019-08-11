import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  static defaultProps = {
    errorMessage: 'Введите данные',
  };
  static propTypes = {
    valid: PropTypes.bool,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    // options: PropTypes.array.isRequired,
  };

  render() {
    const {
      placeholder,
      options,
      label,
      value,
      required,
      valid,
      touched,
      errorMessage,
      onChange,
      name,
    } = this.props;

    const renderOptions = options.map(({ id, name }) => {
      return (
        <option key={id} value={id}>
          {name}
        </option>
      );
    });

    const renderError =
      required && !valid && touched ? (
        <div style={{ color: 'red' }}>{errorMessage}</div>
      ) : null;

    return (
      <div className="form-group">
        {label ? (
          <label>
            <b>{label}</b>
          </label>
        ) : null}
        <select
          className={'form-control'}
          value={value}
          onChange={onChange}
          data-name={name}
        >
          {placeholder ? <option value={''}>{placeholder}</option> : null}
          {renderOptions}
        </select>
        {renderError}
      </div>
    );
  }
}
