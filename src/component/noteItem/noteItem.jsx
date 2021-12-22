import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Tag } from "antd";
import { UserOutlined, MessageOutlined, LikeOutlined } from "@ant-design/icons";
import "./noteItem.scss";

class noteItem extends Component {
  state = {
    note: {
      author: "**",
      color: "",
      comment: "-",
      content: "********",
      date: "2021-12-13",
      nid: -1,
      praise: "-",
      tag: "其他",
      tid: -1,
      title: "**",
      uid: -1,
    },
  };

  goDetail = () => {
    this.props.history.push("/main/detail");
  };

  render() {
    const { note: base } = this.state;
    let { note } = this.props;
    // 如果对象为空，赋予原始值
    if (Object.getOwnPropertyNames(note).length === 0) {
      note = base;
    }
    return (
      <div className="note_item">
        <div className="top">
          <h3 className="title" onClick={this.goDetail}>
            {note.title}
          </h3>
          <Tag color={note.color}>{note.tag}</Tag>
        </div>
        <div className="author">
          <UserOutlined />
          <span className="name">{note.author}</span>
        </div>
        <div className="content">
          {note.content}
          {/* 我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
        */}
        </div>
        <div className="bottom">
          <div className="date">{note.date}</div>
          <div className="comment">
            <MessageOutlined /> {note.comment}
          </div>
          <div className="praise">
            <LikeOutlined /> {note.praise}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(noteItem);
