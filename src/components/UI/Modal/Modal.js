import React, {Component} from 'react';

export default class Modal extends Component {

    render() {
        const {visible, title, onClose, children} = this.props;

        const toggleClassName = visible ? "d-block" : "d-none";

        return (
            <div className={`modal ${toggleClassName}`}>
                <div className={`modal-dialog fade show`}>
                    <div className={'modal-header'}>
                        <h3 className={'modal-title'}>{title}</h3>
                        <button className={'close'} onClick={() => onClose()}><i className={'fa fa-times'}></i></button>
                    </div>
                    <div className={`modal-content`}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}