import React, { Component } from "react";
import { Input, message } from "antd";
import NoteItem from "../../component/noteItem/noteItem";
import ajax from "../../api/ajax";
import "./home.scss";

const { Search } = Input;

export default class home extends Component {
  state = {
    // 标签列表
    tagList: [
      {
        tid: -1,
        title: "全部",
        color: "black",
      },
      {
        tid: 1,
        title: "学习",
        color: "black",
      },
      {
        tid: 2,
        title: "生活",
        color: "black",
      },
      {
        tid: 3,
        title: "美食",
        color: "black",
      },
      {
        tid: 4,
        title: "其他",
        color: "black",
      },
    ],
    // 当前标签索引
    curIndex: 0,
    // 贴文列表
    noteList: [
      {
        author: "xhw",
        color: "red",
        comment: 2,
        content: "打发打发",
        date: "2021-12-08",
        nid: 1,
        praise: 1,
        tag: "生活",
        tid: 2,
        title: "合肥",
        uid: 1,
      },
      {},
    ],
  };

  // 搜索内容
  onSearch = (value) => {
    console.log(value);
  };

  // 切换标签
  changeTag = (index) => {
    this.setState({ curIndex: index });
  };

  // 获取标签列表
  reqTagList = () => {
    ajax("/taglist")
      .then((res) => {
        const { tagList } = this.state;
        console.log(res, tagList);
        const { data: tag, status, msg } = res;

        if (status !== 1) return message.error(msg);
        this.setState({ tagList: [...tagList, ...tag] });
        message.success("获取分区成功");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 获取贴文情况
  reqNoteList = () => {
    ajax("/notelist")
      .then((res) => {
        const { data: noteList, status, msg } = res;
        if (status !== 1) return message.error(msg);
        message.success("获取贴文成功",1);
        this.setState({ noteList });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount() {
    // this.reqTagList();
    // this.reqNoteList();
  }

  render() {
    const { tagList, curIndex, noteList } = this.state;
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
          {tagList.map((tag, index) => {
            return (
              <li
                key={index}
                onClick={() => this.changeTag(index)}
                className={curIndex === index ? "active" : ""}
              >
                {tag.title}
              </li>
            );
          })}
        </ul>
        <div className="note_wrap">
          {!noteList.length && (
            <div style={{ textAlign: "center" }}>暂无数据</div>
          )}
          {noteList.length &&
            noteList.map((note, index) => {
              return <NoteItem key={index} note={note}></NoteItem>;
            })}
        </div>
      </div>
    );
  }
}
