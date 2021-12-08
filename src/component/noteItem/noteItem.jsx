import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import { Tag } from "antd";
import { UserOutlined, MessageOutlined,LikeOutlined } from "@ant-design/icons";
import "./noteItem.scss";

class noteItem extends Component {
  state = {
    title: "",
  };

  goDetail = ()=>{
    this.props.history.push('/main/detail');
  }

  render() {
    return (
      <div className="note_item" onClick={this.goDetail}>
        <div className="top">
          <h3 className="title">test</h3>
          <Tag>学习</Tag>
        </div>
        <div className="author">
          <UserOutlined />
          <span className="name">xhw</span>
        </div>
        <div className="content">
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
          我是你法回放v年底规划发hi算法发滴哦覅会发生方法对付大大方方
        </div>
        <div className="bottom">
          <div className="date">2019-01-01</div>
          <div className="comment">
            <MessageOutlined /> 2
          </div>
          <div className="praise">
            <LikeOutlined /> 1
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(noteItem);