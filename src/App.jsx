import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/main" component={Main}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Redirect to="/login"></Redirect>
        </Switch>
      </BrowserRouter>
    );
  }
}
