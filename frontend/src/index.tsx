import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "fontsource-roboto";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {loadLocaleData} from "./helper";

async function bootstrapApplication() {
  const messages = await loadLocaleData();
  ReactDOM.render(
    <React.StrictMode>
      <App messages={messages} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

bootstrapApplication();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
