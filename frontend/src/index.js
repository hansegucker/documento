import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fontsource-roboto';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {loadLocaleData} from "./helper";

async function bootstrapApplication(locale) {
    const messages = await loadLocaleData(locale)
    ReactDOM.render(
        <React.StrictMode>
            <App locale={locale} messages={messages}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

bootstrapApplication("de");

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
