import React from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IrregularVerbs from "./pages/IrregularVerbs";
import Training from "./pages/Training";

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
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            {routeComponents.map(
              ({ navName, path }) =>
                navName ? (
                  <li key={path}>
                    <Link to={path}>{navName}</Link>
                  </li>
                ) : null
            )}
          </ul>
        </nav>
      </header>
      <main>
        {routeComponents.map(({ path, component }) => (
          <Route key={path} path={path} exact component={component} />
        ))}
      </main>
    </div>
  );
}

export default App;
