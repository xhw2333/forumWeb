import React, { Component } from "react";
import { Input, Button } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import "./login.scss";

export default class login extends Component {
  handleSubmit = () => {
    const {
      name: {
        state: { value: name },
      },
      pwd: {
        state: { value: pwd },
      },
    } = this;
    console.log(name,pwd);
    this.props.history.push("/main/");
  };

  render() {
    return (
      <div className="login">
        <div className="wrap">
          <h3>用户登录</h3>
          <div className="user">
            <span>用户名</span>
            <Input
              ref={(c) => (this.name = c)}
              style={{ width: "70%" }}
            ></Input>
          </div>
          <div className="pwd">
            <span>密码</span>
            <Input.Password
              ref={(c) => (this.pwd = c)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{ width: "70%" }}
            ></Input.Password>
          </div>
          <div className="code">
            <span>验证码</span>
            <div style={{ width: "70%" }}>
              <Input style={{}}></Input>
              <img src="../../assets/logo.png" alt="" />
            </div>
          </div>
          <div className="submit">
            <Button type="primary" size="large" onClick={this.handleSubmit}>
              登录
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
