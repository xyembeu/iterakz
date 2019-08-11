import React, {Component} from 'react';

import {connect} from 'react-redux';
import {logout} from '../../store/auth/actions';


class Logout extends Component {

    render() {
        const {bindClass, children, logout} = this.props;
        return (
            <a
                href="#/"
                className={`${bindClass ? bindClass : ''}`}
                onClick={() => logout()}
            >
                {children}
            </a>
        );
    }
}

const dispatchStateToProps = {
    logout,
};

export default connect(
    null,
    dispatchStateToProps
)(Logout);
