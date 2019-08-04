import React, {Component} from 'react'

import {connect} from "react-redux";
import {setAuth, setProfile} from "../../store/auth/actions";

import axios from "axios";

class Logout extends Component {

    onLogout = () => {
        delete axios.defaults.headers.common['X-Auth-Token'];
        localStorage.removeItem('secretKey');
        this.props.setProfile({});
        this.props.setAuth('');
    };

    render() {
        const {bindClass, children} = this.props;
        return (
            <a href={'javascript:;'} className={`${bindClass ? bindClass : ''}`} onClick={() => this.onLogout()}>
                {children}
            </a>
        )
    }
}

const dispatchStateToProps = {
    setAuth,
    setProfile
};

export default connect(null, dispatchStateToProps)(Logout);