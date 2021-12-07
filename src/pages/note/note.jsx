import React, { Component } from "react";
import { Button, Table, Space, Tag, Modal, message } from "antd";
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
        dataIndex: "name",
        key: "name",
      },
      {
        title: "创作日期",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "标签",
        dataIndex: "tags",
        key: "tags",
        render: (tags) => (
          <span>
            {tags.map((tag, index) => {
              return (
                <Tag color={"blue"} key={tag}>
                  {tag}
                </Tag>
              );
            })}
          </span>
        ),
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
            <Button type="primary" onClick={() => this.showMore(e)}>
              更多
            </Button>
          </Space>
        ),
      },
    ],
    dataSource: [
      {
        key: "1",
        name: "xhw",
        title: "4088",
        date: "2020-12-11",
        tags: [1, 2],
      },
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
        message.success(`已删除《${e.title}》贴文`);
      },
    });
  };

  //显示更多
  showMore = (e) => {
    console.log(e);
    this.props.history.push("/main/home");
  };

  render() {
    const { columns, dataSource } = this.state;
    return (
      <div className="note">
        <div className="top">
          <h3>我发布的贴文</h3>
          <Button type="primary">+ 写贴文</Button>
        </div>
        <div className="note_wrap">
          <Table
            pagination={false}
            columns={columns}
            dataSource={dataSource}
            bordered
          ></Table>
        </div>
      </div>
    );
  }
}
