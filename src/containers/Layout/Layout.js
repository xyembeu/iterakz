import React, {Component} from 'react';

import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import Header from "../Header/Header";
import Yield from "../Yield/Yield";
import Footer from "../Footer/Footer";

import {connect} from "react-redux";

import {getProfile} from "../../store/auth/actions";
import {getCities} from "../../store/config/actions";


class Layout extends Component {
    state = {
        toggleClass: false
    };

    componentDidMount() {
        this.props.getCities();
        this.props.getProfile();
    }

    onToggleClass = () =>{
        this.setState(({toggleClass})=>{
           return{
               toggleClass:!toggleClass
           }
        });
    };

    render() {
        const {toggleClass} = this.state;
        return (
            <div id="wrapper">
                <Sidebar/>
                <Content toggleClass={toggleClass}>
                    <Header onToggleClass={this.onToggleClass}/>
                    <Yield>
                        {this.props.children}
                    </Yield>
                    <Footer/>
                </Content>
            </div>
        )
    }
}

const dispatchStateToProps = {
    getProfile,
    getCities
};

export default connect(null,dispatchStateToProps)(Layout);
