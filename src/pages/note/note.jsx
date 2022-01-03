import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Space, Tag, Modal, message } from "antd";
import ajax from "../../api/ajax";
import "./note.scss";

export default class note extends Component {
  state = {
    columns: [
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "创作者",
        dataIndex: "author",
        key: "author",
      },
      {
        title: "创作日期",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "标签",
        dataIndex: "tag",
        key: "tag",
        render: (tag,note) => {
          // console.log(tag, note);
          return <Tag color={note.color}>{tag}</Tag>;
        },
      },
      {
        title: "操作",
        key: "action",
        align: "center",
        render: (e) => (
          <Space size="middle">
            <Button type="danger" onClick={() => this.handleDelete(e)}>
              删除
            </Button>
            <Button
              type="primary"
              onClick={() => this.props.history.push("/main/publish")}
            >
              修改
            </Button>
            <Button onClick={() => this.showMore(e)}>更多</Button>
          </Space>
        ),
      },
    ],
    noteList: [
      // {
      //   key: '1',
      //   title: "合肥",
      //   author: "xhw",
      //   date: "2021-12-08",
      //   tag: "生活",
      // },
    ],
  };

  // 删除
  handleDelete = (e) => {
    console.log(e);
    Modal.confirm({
      title: `确认删除《${e.title}》贴文`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        // this.props.history.replace("/login");
        message.success(`已删除《${e.title}》贴文`,1);
      },
    });
  };

  //显示更多
  showMore = (e) => {
    console.log(e);
    const {nid} = e;
    this.props.history.push({ pathname: "/main/detail", query: { nid } });

  };

  // 获取贴文
  getMyNote = (uid = 1) => {
    ajax("/notelist", { uid })
      .then((res) => {
        console.log(res);
        const { status, data, msg } = res;
        if (status !== 1) return message.error(msg,1);
        const noteList = data.map((note, index) => {
          return {
            ...note,
            key: +index + 1,
          };
        });
        this.setState({ noteList });
        message.success("获取贴文成功",1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.getMyNote(1);
  }

  render() {
    const { columns, noteList } = this.state;
    console.log(noteList);
    return (
      <div className="note">
        <div className="top">
          <h3>我发布的贴文</h3>
          <Link to="/main/publish">
            <Button type="primary">+ 写贴文</Button>
          </Link>
        </div>
        <div className="note_wrap">
          <Table
            pagination={false}
            columns={columns}
            dataSource={noteList}
            bordered
          ></Table>
        </div>
      </div>
    );
  }
}
