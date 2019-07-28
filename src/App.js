import React from "react";
import "./App.css";
import {Route, Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
// components
import HomePage from "./pages/HomePage";
import IrregularVerbs from "./pages/IrregularVerbs";
import Training from "./pages/Training";
// ui components
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    link: {
        display: 'inline-block',
        padding: theme.spacing(1),

    },
}));


const routeComponents = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/irregular-verbs",
        component: IrregularVerbs,
        navName: "Irregular Verb"
    },
    {
        path: "/training",
        component: Training,
        navName: "Training"
    }
];

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <header>
                <Paper>
                    <nav>
                        {routeComponents.map(
                            ({navName, path}) =>
                                navName ? (
                                    <Link key={path} to={path} className={classes.link}>
                                        <Button>
                                            {navName}
                                        </Button>
                                    </Link>
                                ) : null
                        )}
                    </nav>
                </Paper>
            </header>
            <main>
                {routeComponents.map(({path, component}) => (
                    <Route key={path} path={path} exact component={component}/>
                ))}
            </main>
        </div>
    );
}

export default App;
