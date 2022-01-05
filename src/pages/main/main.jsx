import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import { mainRoutes as routes } from "../../routes/index";
import "./main.scss";
export default class main extends Component {
  render() {
    return (
      <div className="main">
        <Header></Header>
        <div className="main_wrap">
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
            <Redirect to="/main/home"></Redirect>
          </Switch>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
