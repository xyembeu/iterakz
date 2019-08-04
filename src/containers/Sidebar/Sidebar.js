import React, {Component} from 'react'

import {connect} from "react-redux";

import {withRouter, NavLink} from "react-router-dom";
import Logout from "../../components/Logout/Logout";


class Sidebar extends Component {
    state = {
        menu: false
    };

    onToggleMenu = () =>{
        this.setState(({menu})=>{
           return{
               menu:!menu
           }
        });
    };

    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    };

    render() {
        const {profile:{firstName, positionTitle}} = this.props;
        const {menu} = this.state;
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <div className="sidebar-collapse">
                    <ul className="nav metismenu" id="side-menu">
                        <li className="nav-header">
                            <div className="dropdown profile-element">
                                <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:;">
                                    <span className="block m-t-xs font-bold">{firstName}</span>
                                    <span className="text-muted text-xs block" onClick={()=>this.onToggleMenu()}>{positionTitle}<b className="caret"></b></span>
                                </a>
                                <ul className={`dropdown-menu animated fadeInRight m-t-xs ${menu?'show':''}`}>
                                    <li>
                                        <Logout bindClass={'dropdown-item'}>
                                            Выйти
                                        </Logout>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className={this.getNavLinkClass("/")}>
                            <NavLink to="/" activeClassName="active"><i className="fa fa-th-large"></i> <span
                                className="nav-label">Заказы</span></NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


const mapStateToProps = ({auth: {profile}}) => {
    return {
        profile
    }
};

export default withRouter(connect(mapStateToProps)(Sidebar));
