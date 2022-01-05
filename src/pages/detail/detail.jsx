import React, { Component } from "react";
import { Tag, List, Avatar, Input, Button, message, Modal } from "antd";
import { LikeFilled, MessageFilled,UserOutlined } from "@ant-design/icons";
import ajax from "../../api/ajax";
import global from "../../store/index";
import { checkValIsNull } from "../../utils/check";
import "./detail.scss";

export default class detail extends Component {
  state = {
    // 评论区
    commentList: [
      // {
      //   cid: -1,
      //   commenter: "***",
      //   content: "***",
      //   nid: -1,
      //   uid: -1,
      // },
    ],
    // 评论框
    commentVisible: false,
    // 点赞状态
    ifPraise: false,
    // 评论框内容
    comment: "",
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
    const { ifPraise, note } = this.state;
    const { user } = global;
    const data = {
      nid: note.nid,
      uid: user.uid,
    };
    // 已是点赞状态，准备取消赞
    if (ifPraise) {
      ajax("/cancelpraise", data, "POST")
        .then((res) => {
          console.log(res);
          const { status, msg } = res;
          if (status !== 1) return message.error(msg, 1);

          message.success(msg, 1);
          this.setState({ ifPraise: !ifPraise });
        })
        .catch((err) => {
          if (user.uid === -1) {
            message.info("请先登录！", 1);
          } else {
            message.error("服务器内部错误", 1);
          }
        });
    }
    // 已是没赞的状态，正准备点赞
    else {
      ajax("/praise", data, "POST")
        .then((res) => {
          console.log(res);
          const { status, msg } = res;
          if (status !== 1) return message.error(msg, 1);

          message.success(msg, 1);
          this.setState({ ifPraise: !ifPraise });
        })
        .catch((err) => {
          if (user.uid === -1) {
            message.info("请先登录！", 1);
          } else {
            message.error("服务器内部错误", 1);
          }
        });
    }
  };

  //   控制评论框显示
  toggleComment = () => {
    const { commentVisible } = this.state;
    this.setState({ commentVisible: !commentVisible });
  };

  // 获取贴文有关信息
  getNoteDetail = async (nid) => {
    try {
      const { user } = global;

      // 贴文详情
      {
        const { status, msg, data } = await ajax("/notelist", { nid });
        if (status !== 1) return message.error(msg, 1);
        this.setState({ note: data });
      }

      // 评论详情
      this.getComment(nid);

      // 点赞详情
      {
        const { status, msg, data } = await ajax("/ifpraise", {
          nid,
          uid: user.uid,
        });
        if (status !== 1) return message.error(msg, 1);
        this.setState({ ifPraise: data });
      }

      message.success("获取贴文详情成功", 1);
    } catch (e) {
      message.error("服务器内部错误", 1);
    }
  };

  // 获取评论
  getComment = (nid) => {
    ajax("/commentlist", { nid })
      .then((res) => {
        const { status, msg, data } = res;
        if (status !== 1) return message.error(msg, 1);
        this.setState({ commentList: data });
      })
      .catch((err) => {
        message.error("服务器内部错误",1);
      });
  };

  // 处理评论
  handleComment = (e) => {
    this.setState({ comment: e.target.value });
  };

  // 处理评论回车事件
  handleEnter = (e)=>{
    if(e.keyCode === 13){
      this.commitComment();
    }
  }

  // 提交评论
  commitComment = () => {
    const { comment, note } = this.state;
    const { user } = global;

    const data = {
      content: comment,
      nid: note.nid,
      uid: user.uid,
    };

    if (checkValIsNull(comment)) return message.error("请输入评论！");

    // 评论
    ajax("/addcomment", data, "POST")
      .then((res) => {
        const { status, msg } = res;
        if (status !== 1) return message.error(msg, 1);
        message.success("评论成功", 1);
        // 清空评论
        this.setState({ comment: "" });
        this.getComment(note.nid);
      })
      .catch((err) => {
        if (user.uid === -1) {
          message.info("请先登录！", 1);
        } else {
          message.error("服务器内部错误", 1);
        }
      });
  };

  // 删除评论
  deleteComment = (cid, uid, nid) => {
    Modal.confirm({
      title: `确认删除该评论`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        const { user } = global;
        if (uid !== user.uid) return message.error("无法删除别人的评论！");
        ajax("/deletecomment", { cid, uid }, "POST")
          .then((res) => {
            console.log(res);
            const { status, msg } = res;
            if (status !== 1) return message.error(msg, 1);
            message.success(msg, 1);
            this.getComment(nid);
          })
          .catch((err) => {
            if (user.uid === -1) {
              message.info("请先登录！", 1);
            } else {
              message.error("服务器内部错误", 1);
            }
          });
      },
    });
  };

  componentDidMount() {
    // console.log(this.props);
    const { nid } = this.props.location.query || {};
    console.log(nid);
    this.getNoteDetail(nid);
  }

  render() {
    const { commentList, commentVisible, ifPraise, note, comment } = this.state;
    const { user } = global;
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
              color: ifPraise ? "#0084ff" : "#999aaa", //f8f8f8
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
          <Input
            value={comment}
            onKeyDown={e=> this.handleEnter(e)}
            onChange={this.handleComment}
          ></Input>
          <Button className="btn" type="primary" onClick={this.commitComment}>
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
                  avatar={<Avatar icon={<UserOutlined/>}/>}
                  title={item.commenter}
                  description={item.content}
                />
                <Button
                  type="danger"
                  style={{ display: item.uid === user.uid ? "" : "none" }}
                  onClick={() =>
                    this.deleteComment(item.cid, item.uid, item.nid)
                  }
                >
                  删除
                </Button>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
