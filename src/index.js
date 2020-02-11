import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import {Provider} from 'react-redux'
import storage from './public/redux/store'
import {PersistGate} from 'redux-persist/integration/react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
const {store, persistor} = storage

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <SnackbarProvider maxSnack={5}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SnackbarProvider>
        </PersistGate>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
