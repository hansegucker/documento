import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./components/Documents";
import NotFound from "./components/NotFound";
import {applyMiddleware, createStore} from "redux";
import documentoApp from "./reducers";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

let store = createStore(documentoApp, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={Dashboard}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
