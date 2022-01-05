import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "./routes/index";
import './App.css';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map((r) => {
            return (
              <Route
                key={r.path}
                path={r.path}
                component={r.component}
                exact={r.exact}
              ></Route>
            );
          })}
          <Redirect to="/login"></Redirect>
        </Switch>
      </BrowserRouter>
      // routes
    );
  }
}
