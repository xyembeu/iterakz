import React, {Component} from 'react';

import {connect} from "react-redux";
import {setProfile} from "../../store/auth/actions";
import {setCities} from "../../store/config/actions";

import axios from "axios";

import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import Header from "../Header/Header";
import Yield from "../Yield/Yield";
import Footer from "../Footer/Footer";


class Layout extends Component {
    state = {
        toggleClass: false
    };

    componentDidMount() {

        axios.get(`http://task01.softlab.kz/data/control/employee/profile`)
            .then(({data}) => {
                this.props.setProfile(data);
            });

        axios.get(`http://task01.softlab.kz/config`)
            .then(({data: {cities}}) => {
                this.props.setCities(cities);
            });
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
                    <Footer/>>
                </Content>
            </div>
        )
    }
}

const dispatchStateToProps = {
    setCities,
    setProfile
};


export default connect(null, dispatchStateToProps)(Layout);