import React, {Component, useEffect} from "react";
import "./App.css";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Documents from "./components/Documents";
import NotFound from "./components/NotFound";
import {applyMiddleware, createStore, Dispatch} from "redux";
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
import {Auth, Locale, Messages} from "./types";

let store = createStore(documentoApp, applyMiddleware(thunk));

function RootContainerComponent(props: {
  auth: Auth;
  locale: Locale;
  loadUser: Function;
  messages: Messages;
}) {
  useEffect(() => {
    props.loadUser();
  }, [props.auth]);

  const classes = useStyles();

  const PrivateRoute = ({
    component: ChildComponent,
    ...rest
  }: {
    component: Function;
    [key: string]: any;
  }) => {
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

type RootState = {
  auth: Auth;
  locale: Locale;
};

interface RootDispatch {
  loadUser: () => Dispatch;
}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
    locale: state.locale,
  };
};

const mapDispatchToProps = (dispatch: Function): RootDispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    },
  };
};
let RootContainer = connect<
  RootState,
  RootDispatch,
  {messages: Messages},
  {messages: Messages; auth: Auth; locale: Locale}
>(
  mapStateToProps,
  mapDispatchToProps
)(RootContainerComponent);
type State = {};
type Props = {messages: Messages};
export default class App extends Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <RootContainer messages={this.props.messages} />
      </Provider>
    );
  }
}
