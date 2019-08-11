import React, { Component } from 'react';

export default class Box extends Component {
  static defaultProps = {
    toggle: false,
  };

  state = {
    hidden: false,
  };

  onToggle = () => {
    this.setState(({ hidden }) => {
      return {
        hidden: !hidden,
      };
    });
  };

  render() {
    const { toggle, children } = this.props;
    const { hidden } = this.state;

    const renderToggle = toggle ? (
      <div className="ibox-tools">
        <div onClick={this.onToggle} style={{ cursor: 'pointer' }}>
          Скрыть <i className="fa fa-chevron-up" />
        </div>
      </div>
    ) : null;

    const renderContent = !hidden ? (
      <div className="ibox-content">{children}</div>
    ) : null;

    return (
      <div className="ibox float-e-margins">
        <div className="ibox-title">
          <h5>{this.props.title}</h5>
          {renderToggle}
        </div>
        {renderContent}
      </div>
    );
  }
}
