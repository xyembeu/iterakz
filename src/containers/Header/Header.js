import React, {Component} from 'react'

import Logout from "../../components/Logout/Logout";

export default class Header extends Component {

    render() {
        const {onToggleClass} = this.props;
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation">
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="javascript:;"
                           onClick={() => onToggleClass()}>
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <Logout>
                                <i className="fa fa-sign-out"></i> Выйти
                            </Logout>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
