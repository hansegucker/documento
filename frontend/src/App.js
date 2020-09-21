import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={Dashboard}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
