import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {HashRouter} from "react-router-dom";
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: red,
        success: green // TODO how to add custom variant?
    },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <HashRouter>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </HashRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
