import React, { Component } from "react";
import { Input, Button, message } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { checkValIsNull } from "../../utils/check";
import "./login.scss";

export default class login extends Component {
  state = {
    loginModal: true,
  };

  // 登录
  handleLogin = () => {
    const {
      name: {
        state: { value: name = "" },
      },
      pwd: {
        state: { value: pwd = "" },
      },
    } = this;
    console.log(name, pwd);
    if (checkValIsNull(name)) return message.info("用户名不能为空！");
    if (checkValIsNull(pwd)) return message.info("密码不能为空！");
    message.success("登陆成功");
    setTimeout(()=>this.props.history.push("/main/"),500);
  };

  // 处理注册
  handleRegister = () => {
    const {
      rname: {
        state: { value: name = "" },
      },
      rpwd: {
        state: { value: pwd = "" },
      },
      rnpwd: {
        state: { value: npwd = "" },
      },
    } = this;

    console.log(name,pwd,npwd);
    if (checkValIsNull(name)) return message.info("用户名不能为空！");
    if (checkValIsNull(pwd)) return message.info("密码不能为空！");
    if(pwd !== npwd) return message.info("输入的密码不一致");

    message.success("注册成功");
  };

  // 开关
  toggleBtn = () => {
    const { loginModal } = this.state;
    this.setState({ loginModal: !loginModal });
  };

  render() {
    const { loginModal } = this.state;

    return (
      <div className="login">
        {loginModal && (
          <div className="login_wrap">
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
            {/* <div className="code">
              <span>验证码</span>
              <div style={{ width: "70%" }}>
                <Input style={{}}></Input>
                <img src="../../assets/logo.png" alt="" />
              </div>
            </div> */}
            <div className="to">
              <span onClick={this.toggleBtn}>还未注册，前往注册→</span>
            </div>
            <div className="submit">
              <Button type="primary" size="large" onClick={this.handleLogin}>
                登录
              </Button>
            </div>
          </div>
        )}
        {!loginModal && (
          <div className="reg_wrap">
            <h3>用户注册</h3>
            <div className="user">
              <span>用户名</span>
              <Input
                ref={(c) => (this.rname = c)}
                style={{ width: "70%" }}
              ></Input>
            </div>
            <div className="pwd">
              <span>密码</span>
              <Input.Password
                ref={(c) => (this.rpwd = c)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ width: "70%" }}
              ></Input.Password>
            </div>
            <div className="pwd">
              <span>确认新密码</span>
              <Input.Password
                ref={(c) => (this.rnpwd = c)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ width: "70%" }}
              ></Input.Password>
            </div>
            <div className="to">
              <span onClick={this.toggleBtn}>已有帐号，前往登录→</span>
            </div>
            <div className="submit">
              <Button type="primary" size="large" onClick={this.handleRegister}>
                注册
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
