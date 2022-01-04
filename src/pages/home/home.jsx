import React, { Component } from "react";
import { Input, message } from "antd";
import NoteItem from "../../component/noteItem/noteItem";
import ajax from "../../api/ajax";
import global from "../../store/index";
import "./home.scss";

const { Search } = Input;

export default class home extends Component {
  state = {
    // 标签列表
    tagList: [
      {
        tid: -1,
        tag: "全部",
        color: "black",
      },
      // {
      //   tid: 1,
      //   title: "学习",
      //   color: "black",
      // },
      // {
      //   tid: 2,
      //   title: "生活",
      //   color: "black",
      // },
      // {
      //   tid: 3,
      //   title: "美食",
      //   color: "black",
      // },
      // {
      //   tid: 4,
      //   title: "其他",
      //   color: "black",
      // },
    ],
    // 当前标签索引
    curIndex: 0,
    // 贴文列表
    noteList: [
      // {
      //   author: "xhw",
      //   color: "red",
      //   comment: 2,
      //   content: "打发打发",
      //   date: "2021-12-08",
      //   nid: 1,
      //   praise: 1,
      //   tag: "生活",
      //   tid: 2,
      //   title: "合肥",
      //   uid: 1,
      // },
      {},
    ],
  };

  // 搜索内容
  onSearch = (value) => {
    console.log(value);
  };

  // 切换标签
  changeTag = (index) => {
    const { tagList } = this.state;
    this.setState({ curIndex: index });
    ajax("/notelist", index === 0 ? {} : { tid: tagList[index].tid })
      .then((res) => {
        console.log(res);
        const { data, status, msg } = res;
        if (status !== 1) return message.error(msg);
        message.success("获取贴文成功", 1);
        this.setState({ noteList: data });
        console.log(this.state.noteList);
      })
      .catch((err) => {
        message.error("服务器错误", 1);
      });
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
        global.tagArr = tag;
        message.success("获取分区成功", 0.5);
      })
      .catch((err) => {
        message.error("服务器内部错误",1);
      });
  };

  // 获取贴文情况
  reqNoteList = (uid = -1) => {
    if (uid !== -1) this.setState({ curIndex: -1 });
    ajax("/notelist", uid === -1 ? {} : { uid })
      .then((res) => {
        const { data: noteList, status, msg } = res;
        if (status !== 1) return message.error(msg);
        message.success("获取贴文成功", 1);
        this.setState({ noteList });
      })
      .catch((err) => {
        message.error("服务器内部错误",1);
      });
  };

  componentWillMount() {
    this.reqTagList();
    const { location } = this.props;
    let id = -1;
    if ("query" in location) {
      const { uid } = location.query;
      id = uid;
    }
    this.reqNoteList(id);
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
                {tag.tag}
              </li>
            );
          })}
        </ul>
        <div className="note_wrap">
          {!noteList.length && (
            <div style={{ textAlign: "center" }}>暂无数据</div>
          )}
          {noteList.map((note, index) => {
            return <NoteItem key={index} note={note}></NoteItem>;
          })}
        </div>
      </div>
    );
  }
}
