import React, { Component } from "react";
import { Input } from "antd";
import NoteItem from "../../component/noteItem/noteItem";
import "./home.scss";

const { Search } = Input;

export default class home extends Component {
  onSearch = (value) => {
    console.log(value);
  };

  render() {
    return (
      <div className="home">
        <div className="input_wrap">
          <Search
            placeholder="输入关键字搜索贴文"
            onSearch={this.onSearch}
            enterButton
          />
        </div>
        <ul className="tag_wrap">
          <li className="active">全部</li>
          <li>学习</li>
          <li>生活</li>
          <li>美食</li>
          <li>其他</li>
        </ul>
        <div className="note_wrap">
          <NoteItem></NoteItem>
          <NoteItem></NoteItem>
        </div>
      </div>
    );
  }
}
