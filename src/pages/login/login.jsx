import React, { Component } from "react";
import { Input, Button, message } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { checkValIsNull } from "../../utils/check";
import ajax from "../../api/ajax";
import global from "../../store/index";
import "./login.scss";

export default class login extends Component {
  state = {
    loginModal: true,
    imgURL: "",
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
      code: {
        state: { value: code = "" },
      },
    } = this;
    console.log(name, pwd, code);
    if (checkValIsNull(name)) return message.info("用户名不能为空！", 1);
    if (checkValIsNull(pwd)) return message.info("密码不能为空！", 1);
    if (checkValIsNull(code)) return message.info("验证码不能为空！", 1);

    ajax("/login", { name, pwd, code: code.toLowerCase() }, "POST")
      .then((res) => {
        const { status, msg, data } = res;
        if (status !== 1) return message.error(msg, 1);
        // 登陆成功
        message.success(msg, 1);
        const { name, pwd, id } = data;
        global.user.name = name;
        global.user.pwd = pwd;
        global.user.uid = id;
        setTimeout(() => this.props.history.push("/main/"), 500);
      })
      .catch((err) => {
        message.error("服务器内部错误", 1);
      });
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

    console.log(name, pwd, npwd);
    if (checkValIsNull(name)) return message.info("用户名不能为空！", 1);
    if (checkValIsNull(pwd)) return message.info("密码不能为空！", 1);
    if (pwd !== npwd) return message.info("输入的密码不一致", 1);
    ajax("/register", { name, pwd }, "POST")
      .then((res) => {
        const { msg, status } = res;
        if (status !== 1) return message.error(msg, 1);
        // 注册成功
        message.success(msg, 1);
        this.rname.state.value = "";
        this.rpwd.state.value = "";
        this.rnpwd.state.value = "";
      })
      .catch((err) => {
        message.error("服务器内部错误", 1);
      });
  };

  // 获取验证码
  getCode = () => {
    ajax("/code")
      .then((res) => {
        const { data } = res;
        this.setState({ imgURL: data });
        let img = document.querySelector(".imgPic");
        img.innerHTML = data;
      })
      .catch((err) => {
        console.log(err);
        message.error("服务器内部错误", 1);
      });
  };

  // 开关
  toggleBtn = () => {
    const { loginModal } = this.state;
    // 登陆页面呈现时，重新获取验证码
    if(!loginModal) this.getCode();
    this.setState({ loginModal: !loginModal });
  };

  componentWillMount() {
    this.getCode();
  }

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
            <div className="code">
              <span>验证码</span>
              <div style={{ width: "70%" }}>
                <Input
                  ref={(c) => (this.code = c)}
                  style={{ width: "50%" }}
                ></Input>
                <div className="imgPic" onClick={this.getCode}>
                  获取验证码
                </div>
                {/* <img className="img" src={imgURL} alt="验证码" /> */}
              </div>
            </div>
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
