import React, { Component } from "react";
import { Input, Button, Statistic } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import Pie from "../../component/pieChart/pieChart";
import "./me.scss";

export default class me extends Component {
  state = {
    name: "test",
    visible: false,
  };

  toggleBtn = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  render() {
    const { name, visible } = this.state;
    return (
      <div className="me">
        <div className="title">
          <h3>{name} 的个人中心</h3>
        </div>
        <div className="base">
          <div className="left">
            <h4>用户基本情况</h4>
            <div className="wrap">
              <Statistic className="item" title="发帖总数" value={113} />
              <Statistic className="item" title="好友数" value={112} />
            </div>
            <Pie></Pie>
          </div>

          <div className="message">
            <h4>用户基本资料</h4>
            <div className="name">
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
            <div
              className="pwd"
              style={{
                visibility: visible ? "visible" : "hidden",
                transition: "all 0",
              }}
            >
              <span>确认新密码</span>
              <Input.Password
                ref={(c) => (this.pwd = c)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ width: "70%" }}
              ></Input.Password>
            </div>
            <div className="btn_wrap">
              {!visible && (
                <Button className="btn" type="primary" onClick={this.toggleBtn}>
                  修改
                </Button>
              )}
              {visible && (
                <>
                  <Button className="btn" onClick={this.toggleBtn}>
                    取消
                  </Button>
                  <Button
                    className="btn"
                    type="primary"
                    onClick={this.toggleBtn}
                  >
                    保存
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
