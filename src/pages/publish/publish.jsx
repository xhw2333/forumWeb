import React, { Component } from "react";
import { Input, Select, Button, message } from "antd";
import "./publish.scss";
import { checkValIsNull } from "../../utils/check";
import ajax from "../../api/ajax";
import global from "../../store/index";

export default class publish extends Component {
  state = {
    // 贴文信息
    note: {
      // title: '', //标题
      // content: '', //内容
      // tid: 0, //标签id
    },
    // 标签分组
    tagArr: [
      // {
      //   title: "学习",
      //   color: "blue",
      // },
      // {
      //   title: "生活",
      //   color: "red",
      // },
      // {
      //   title: "美食",
      //   color: "volcano",
      // },
      // {
      //   title: "其他",
      //   color: "green",
      // },
    ],
    tid: 0, //标签id
    nid: 0, //贴文id
    title: "", //贴文标题
    content: "", //贴文内容
    ifEdit: true, //是否是可编辑的状态
    ifPublish: false, //是否修改贴文页面的标志（否，则为添加贴文页面）
  };

  // 提交贴文
  commitNote = () => {
    // const {
    //   content: {
    //     resizableTextArea: {
    //       props: { value: content },
    //     },
    //   },
    //   title: {
    //     state: { value: title },
    //   },
    // } = this || {};
    const { tid, content, title } = this.state;
    const { uid } = global.user;
    console.log(content, title, tid, uid);
    if (title === undefined || checkValIsNull(title))
      return message.error("请填写标题", 1);
    if (checkValIsNull(content)) return message.error("请填写内容", 1);

    const data = {
      content,
      title,
      tid,
      uid,
    };
    ajax("/addnote", data, "POST")
      .then((res) => {
        console.log(res);
        const { status, msg } = res;
        // 失败
        if (status !== 1) return message.error(msg, 1);
        // 发表论文成功，清空框内的值
        message.success(msg, 1);
        this.setState({
          title: "",
          content: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //修改贴文
  publishNote = () => {
    const { tid, content, title, nid } = this.state;
    const { user } = global;

    const data = {
      tid,
      content,
      title,
      nid,
      uid: user.uid,
    };

    ajax("/updatenote", data, "POST")
      .then((res) => {
        console.log(res);
        const { status, msg } = res;
        // 修改失败
        if (status !== 1) return message.error(msg, 1);
        // 修改成功
        message.success("修改成功", 1);
        this.setState({ifEdit:false});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 处理标签id
  handleTag = (val) => {
    // console.log(val);
    this.setState({ tid: val });
  };

  // 处理标题
  handleTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  // 处理内容
  handleContent = (e) => {
    this.setState({ content: e.target.value });
  };

  componentWillMount() {
    // 获取标签信息
    console.log(global, this);
    // 获取路由里参数信息
    const { query } = this.props.location;
    // 获取标签数组
    const { tagArr } = global;
    this.setState({
      tagArr,
      tid: tagArr[0].tid || 0,
    });

    if (query !== undefined) {
      console.log(query);
      const { note } = query;
      this.setState({
        nid: note.nid,
        ifPublish: true,
        tid: note.tid,
        title: note.title,
        content: note.content,
        ifEdit: false,
      });
    }
  }

  render() {
    const { tagArr, tid, content, title, ifPublish, ifEdit } = this.state;
    return (
      <div className="publish">
        <div className="top">
          <h3 className="title">贴文编辑</h3>
        </div>
        <div className="pub_note_wrap">
          <div className="">
            <span>标题：</span>
            <Input
              // ref={(c) => (this.title = c)}
              value={title}
              style={{ width: "60%" }}
              onChange={this.handleTitle}
              disabled={!ifEdit}
            ></Input>
          </div>
          <div className="">
            <span>标签：</span>
            <div style={{ width: "60%" }}>
              <Select
                defaultValue={tid}
                size="small"
                disabled={!ifEdit}
                onChange={this.handleTag}
              >
                {tagArr.map((tag, index) => (
                  <Select.Option value={tag.tid} key={index}>
                    {tag.tag}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="content">
            <span>内容：</span>
            <Input.TextArea
              // ref={(c) => (this.content = c)}
              value={content}
              onChange={this.handleContent}
              style={{ width: "60%" }}
              autoSize={{ minRows: 5, maxRows: 8 }}
              disabled={!ifEdit}
            ></Input.TextArea>
          </div>
          <div className="btn_wrap">
            <Button
              className="btn"
              size="large"
              onClick={() => this.props.history.goBack()}
            >
              返回
            </Button>
            <Button
              style={{ display: ifPublish ? "none" : "block" }}
              type="primary"
              className="btn"
              size="large"
              onClick={this.commitNote}
            >
            {/* 添加贴文用的保存按钮 */}
              保存
            </Button>
            <Button
              style={{ display: ifPublish ? "block" : "none" }}
              type="dashed"
              className="btn"
              size="large"
              onClick={()=>{this.setState({ifEdit:!ifEdit})}}
            >
              {ifEdit?'取消':'编辑'}
            </Button>
            <Button
              style={{ display: ifPublish ? "block" : "none" }}
              type="primary"
              className="btn"
              size="large"
              onClick={this.publishNote}
            >
              修改
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
