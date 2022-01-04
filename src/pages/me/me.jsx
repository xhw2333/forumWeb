import React, { Component } from "react";
import { Input, Button, Statistic, message } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import Pie from "../../component/pieChart/pieChart";
import ajax from "../../api/ajax";
import global from "../../store/index";
import { checkValIsNull } from "../../utils/check";
import "./me.scss";

export default class me extends Component {
  state = {
    name: "test", //用户名
    ifEdit: false, //是否可以编辑
    friendCount: 0, //好友数
    noteTotal: 0, //贴文总数
    // 贴文分类情况
    classify: [],
  };

  // 控制开关
  toggleBtn = () => {
    const { ifEdit } = this.state;
    this.setState({ ifEdit: !ifEdit });
  };

  // 获取用户基本情况
  getUserBase = (uid) => {
    ajax("/base", { uid }, "POST")
      .then((res) => {
        console.log(res);
        const { status, msg, data } = res;
        if (status !== 1) return message.error(msg, 1);
        message.success("获取用户基本情况成功", 1);
        const { friendCount, noteTotal, classify } = data;
        this.setState({ friendCount, noteTotal, classify });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 保存信息
  saveMsg = () => {
    console.log(this);
    const {
      name: {
        state: { value: name },
      },
      pwd: {
        state: { value: pwd },
      },
      npwd: {
        state: { value: npwd },
      },
    } = this;
    if (name === undefined || checkValIsNull(name))
      return message.error("用户名不能为空", 1);
    if (pwd === undefined || checkValIsNull(pwd))
      return message.error("密码不能为空", 1);
    if (npwd === undefined || checkValIsNull(npwd))
      return message.error("新密码不能为空", 1);
    if (pwd !== npwd) return message.error("两次密码不一致", 1);

    const { user } = global;
    const data = {
      name,
      pwd,
      uid: user.uid,
    };

    ajax("/updateuser", data, "POST")
      .then((res) => {
        console.log(res);
        const { status, msg } = res;
        if (status !== 1) return message.error(msg, 1);
        message.success(msg, 1);
        // 成功修改用户的逻辑
        global.user.name = name;
        global.user.pwd = pwd;
        this.setState({ name });
        this.toggleBtn();
      })
      .catch((err) => {
        // message.error(err);
        console.log(err);
      });
  };

  componentWillMount() {
    const { user } = global;
    console.log(this);
    this.getUserBase(user.uid);
    this.setState({ name: user.name });
  }

  componentDidMount() {
    const { user } = global;
    this.name.state.value = user.name;
    this.pwd.state.value = user.pwd;
  }

  render() {
    const { name, friendCount, noteTotal, classify, ifEdit } = this.state;
    return (
      <div className="me">
        <div className="title">
          <h3>{name} 的个人中心</h3>
        </div>
        <div className="base">
          <div className="left">
            <h4>用户基本情况</h4>
            <div className="wrap">
              <Statistic className="item" title="发帖总数" value={noteTotal} />
              <Statistic className="item" title="好友数" value={friendCount} />
            </div>
            <Pie noteTotal={noteTotal} classify={classify}></Pie>
          </div>

          <div className="message">
            <h4>用户基本资料</h4>
            <div className="name">
              <span>用户名</span>
              <Input
                ref={(c) => (this.name = c)}
                style={{ width: "70%" }}
                disabled={!ifEdit}
              ></Input>
            </div>
            <div className="pwd">
              <span>密码</span>
              <Input.Password
                ref={(c) => (this.pwd = c)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                disabled={!ifEdit}
                style={{ width: "70%" }}
              ></Input.Password>
            </div>
            <div
              className="pwd"
              style={{
                visibility: ifEdit ? "visible" : "hidden",
              }}
            >
              <span>确认新密码</span>
              <Input.Password
                ref={(c) => (this.npwd = c)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                disabled={!ifEdit}
                style={{ width: "70%" }}
              ></Input.Password>
            </div>
            <div className="btn_wrap">
              <Button
                className="btn"
                type="primary"
                style={{ display: ifEdit ? "none" : "" }}
                onClick={this.toggleBtn}
              >
                修改
              </Button>
              <>
                <Button
                  className="btn"
                  style={{ display: ifEdit ? "" : "none" }}
                  onClick={this.toggleBtn}
                >
                  取消
                </Button>
                <Button
                  style={{ display: ifEdit ? "" : "none" }}
                  className="btn"
                  type="primary"
                  onClick={this.saveMsg}
                >
                  保存
                </Button>
              </>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
