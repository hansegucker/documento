import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "./components/Documents";
import NotFound from "./components/NotFound";
import {applyMiddleware, createStore} from "redux";
import documentoApp from "./reducers";
import {connect, Provider} from "react-redux";
import thunk from "redux-thunk";
import Login from "./components/Login";
import {auth} from "./actions";
import {IntlProvider} from "react-intl";

let store = createStore(documentoApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {
    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else if (!this.props.auth.isAuthenticated) {
                return <Redirect to="/login"/>;
            } else {
                return <ChildComponent {...props} />
            }
        }}/>
    }

    render() {
        let {PrivateRoute} = this;
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path={"/"} component={Dashboard}/>
                    <Route exact path="/login" component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(auth.loadUser());
        }
    }
}
let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);
export default class App extends Component {
    render() {
        return (
            <IntlProvider messages={this.props.messages} locale={this.props.locale} defaultLocale="en">
                <Provider store={store}>
                    <RootContainer/>
                </Provider>
            </IntlProvider>
        )
    }
}