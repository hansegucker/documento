import React, {Component, useEffect} from "react";
import "./App.css";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Documents from "./components/Documents";
import NotFound from "./components/NotFound";
import {applyMiddleware, createStore} from "redux";
import documentoApp from "./reducers";
import {connect, Provider} from "react-redux";
import thunk from "redux-thunk";
import Login from "./components/Login";
import {auth} from "./actions";
import {IntlProvider} from "react-intl";
import {useStyles} from "./styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import DocumentViewer from "./components/DocumentViewer";
import Categories from "./components/Categories";

let store = createStore(documentoApp, applyMiddleware(thunk));

function RootContainerComponent(props) {
  useEffect(() => {
    props.loadUser();
  }, [props.user]);

  const classes = useStyles();

  const PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return (
      <Route
        {...rest}
        render={(props2) => {
          if (props.auth.isLoading) {
            return (
              <div className={classes.loading}>
                <div>
                  <div>
                    <CircularProgress />
                  </div>
                  <div>Loading...</div>
                </div>
              </div>
            );
          } else if (!props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
          } else {
            return <ChildComponent {...props} />;
          }
        }}
      />
    );
  };

  return (
    <IntlProvider
      messages={props.messages[props.locale.id]}
      locale={props.locale.id}
      defaultLocale="en">
      <BrowserRouter>
        {props.auth.isAuthenticated ? <Header /> : ""}
        <div className={props.auth.isAuthenticated ? classes.toolbar : ""} />
        <main
          className={
            props.auth.isAuthenticated || props.auth.isLoading
              ? classes.content
              : classes.contentLogin
          }>
          <Switch>
            <PrivateRoute exact path={"/"} component={Documents} />
            <PrivateRoute exact path={"/categories/"} component={Categories} />
            <PrivateRoute path={"/documents/:id"} component={DocumentViewer} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </IntlProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    locale: state.locale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
  };
};
let RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainerComponent);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer messages={this.props.messages} />
      </Provider>
    );
  }
}
