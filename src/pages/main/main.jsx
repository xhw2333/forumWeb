import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../../component/header/header";
import Home from "../home/home";
import Note from "../note/note";
import Friend from "../friend/friend";
import Me from "../me/me";
// import {Button} from 'antd';
import "./main.scss";
export default class main extends Component {
  render() {
    return (
      <div className="main">
        <Header></Header>
        <div className="main_wrap">
          <Switch>
            <Route exact path="/main/home" component={Home}></Route>
            <Route exact path="/main/note" component={Note}></Route>
            <Route exact path="/main/friend" component={Friend}></Route>
            <Route exact path="/main/me" component={Me}></Route>
            <Redirect to="/main/home"></Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}
