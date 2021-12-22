import React, { Component } from "react";
import { Tag, List, Avatar, Input, Button, message } from "antd";
import { LikeFilled, MessageFilled } from "@ant-design/icons";
import ajax from "../../api/ajax";
import "./detail.scss";

export default class detail extends Component {
  state = {
    // 评论区
    commentList: [
      {
        cid: -1,
        commenter: "***",
        content: "***",
        nid: -1,
        uid: -1,
      },
    ],
    // 评论框
    commentVisible: false,
    // 点赞modal
    praiseStatus: false,
    // 贴文详情
    note: {
      author: "****",
      color: "#333",
      comment: 2,
      content: "****",
      date: "2021-12-08",
      nid: -1,
      praise: 1,
      tag: "其他",
      tid: 4,
      title: "***",
      uid: 1,
    },
  };

  //   控制点赞
  togglePraise = () => {
    const { praiseStatus } = this.state;
    this.setState({ praiseStatus: !praiseStatus });
  };

  //   控制评论框显示
  toggleComment = () => {
    const { commentVisible } = this.state;
    this.setState({ commentVisible: !commentVisible });
  };

  getNoteDetail = async (nid) => {
    try {
      // 贴文详情
      {
        const { status, msg, data } = await ajax("/notelist", { nid });
        if (status !== 1) return message.error(msg, 1);
        this.setState({ note: data });
      }

      // 评论详情
      {
        const { status, msg, data } = await ajax("/commentlist", { nid });
        if (status !== 1) return message.error(msg, 1);
        this.setState({commentList:data});
      }

      // 点赞详情
      {
        let uid = 1;
        const { status, msg, data } = await ajax("/ifpraise", { nid,uid });
        if (status !== 1) return message.error(msg, 1);
        this.setState({praiseStatus:data});
      }

      message.success("获取贴文详情成功",1);
    } catch (e) {
      message.error("服务器内部错误");
    }
  };

  componentDidMount() {
    // console.log(this.props);
    const { nid } = this.props.location.query || {};
    console.log(nid);
    // this.getNoteDetail(nid);
  }

  render() {
    const { commentList, commentVisible, praiseStatus, note } = this.state;
    return (
      <div className="detail">
        <h3>{note.title}</h3>
        <div className="tips">
          <strong>{note.author}</strong>
          <span>{note.date}</span>
          <Tag color={note.color}>{note.tag}</Tag>
        </div>
        <div className="content">{note.content}</div>
        <div className="tool">
          <LikeFilled
            onClick={this.togglePraise}
            style={{
              fontSize: 20,
              cursor: "pointer",
              color: praiseStatus ? "#0084ff" : "#999aaa", //f8f8f8
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
            dataSource={commentList}
            size="large"
            bordered
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={item.commenter}
                  description={item.content}
                />
                <Button type="danger">删除</Button>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
