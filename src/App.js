import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Orders from './containers/Orders/Orders';
import Login from './containers/Login/Login';

import {connect} from 'react-redux';
import 'pace-js'

class App extends Component {

    render() {
        const publicRoutes = () => {
            return (
                <Layout>
                    {<Route path='/' exact component={Orders}/>}
                    <Route render={() => <Redirect to="/"/>}/>
                </Layout>
            );
        };

        const privateRoutes = () => {
            return (
                <>
                    <Route path="/" component={Login}/>
                    <Route render={() => <Redirect to="/login"/>}/>
                </>
            );
        };

        const renderRoutes =
            this.props.secretKey !== '' || localStorage.getItem('secretKey')
                ? publicRoutes()
                : privateRoutes();

        return (
            <Switch>
                {renderRoutes}
            </Switch>
        );
    }
}

const mapStateToProps = ({auth: {secretKey}}) => {
    return {
        secretKey
    };
};

export default withRouter(connect(mapStateToProps)(App));
