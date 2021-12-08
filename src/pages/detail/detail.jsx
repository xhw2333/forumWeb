import React, { Component } from "react";
import { Tag, List, Avatar, Input, Button } from "antd";
import { LikeFilled, MessageFilled } from "@ant-design/icons";
import "./detail.scss";

export default class detail extends Component {
  state = {
    list: [
      {
        name: "xhw",
        comment: "你好",
      },
      {
        name: "xhw",
        comment: "你好",
      },
    ],
    // 评论框
    commentVisible: false,
    // 点赞modal
    praiseModal: false,
  };

  //   控制点赞
  togglePraise = () => {
    const { praiseModal } = this.state;
    this.setState({ praiseModal: !praiseModal });
  };

  //   控制评论框显示
  toggleComment = () => {
    const { commentVisible } = this.state;
    this.setState({ commentVisible: !commentVisible });
  };

  render() {
    const { list, commentVisible, praiseModal } = this.state;
    return (
      <div className="detail">
        <h3>标题</h3>
        <div className="tips">
          <strong>xhw2333</strong>
          <span>2019-01-01</span>
          <Tag>学习</Tag>
        </div>
        <div className="content">内容</div>
        <div className="tool">
          <LikeFilled
            onClick={this.togglePraise}
            style={{
              fontSize: 20,
              cursor: "pointer",
              color: praiseModal ? "#0084ff":"#999aaa", //f8f8f8
            }}
          />
          <MessageFilled
            className="item"
            onClick={this.toggleComment}
            style={{
              fontSize: 20,
              cursor: "pointer",
              color: "#999aaa", //f8f8f8
            }}
          />
        </div>
        <div
          className="comment_wrap"
          style={{ display: commentVisible ? "" : "none" }}
        >
          <Input></Input>
          <Button className="btn" type="primary">
            评论
          </Button>
        </div>
        <div className="comment_area">
          <h4 className="title">评论区</h4>
          <List
            className="friend_list"
            dataSource={list}
            size="large"
            bordered
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={item.name}
                  description="此用户很赖，没有介绍"
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
