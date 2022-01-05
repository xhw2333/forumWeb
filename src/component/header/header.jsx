import React, { Component } from "react";
import Pubsub from "pubsub-js";
import { NavLink, withRouter, Link } from "react-router-dom";
import global from "../../store/index";
import { Modal } from "antd";
import "./header.scss";

class header extends Component {
  state = {
    name: "",
    ifLogin: false,
  };

  handleExit = () => {
    const { ifLogin } = this.state;

    Modal.confirm({
      title: "确认退出",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this.props.history.replace("/login");
        global.user.uid = -1;
        global.user.name = "";
        global.user.pwd = "";
        this.setState({ ifLogin: !ifLogin });
      },
    });
  };

  componentWillMount() {
    const { user } = global;
    if (user.uid !== -1) {
      this.setState({
        ifLogin: true,
        name: user.name,
      });
    }
  }

  componentDidMount() {
    // 订阅
    this.token = Pubsub.subscribe("update", (msg, data) => {
      // const {name} = data;
      this.setState(data);
    });
  }

  componentWillUnmount() {
    // 取消订阅
    Pubsub.unsubscribe(this.token);
  }

  render() {
    const { ifLogin, name } = this.state;
    return (
      <div className="header">
        <div className="logo_wrap">
          <h1>论坛系统</h1>
          {/* <img src="" alt="" /> */}
        </div>
        <div className="nav">
          <NavLink to="/main/home" className="item">
            首页
          </NavLink>
          <NavLink to="/main/note" className="item">
            创作
          </NavLink>
          <NavLink to="/main/friend" className="item">
            好友
          </NavLink>
          <NavLink to="/main/me" className="item">
            个人中心
          </NavLink>
        </div>
        <div className="tip_wrap">
          <div style={{ display: ifLogin ? "" : "none" }}>
            {name}，欢迎你！
            <span onClick={this.handleExit}>退出</span>
          </div>
          <Link style={{ display: ifLogin ? "none" : "" }} to="/login">
            登录 | 注册
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(header);
