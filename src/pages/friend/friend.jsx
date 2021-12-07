import React, { Component } from "react";
import { List, Avatar, Button, Modal, message, Input, Table } from "antd";
import "./friend.scss";

export default class friend extends Component {
  state = {
    list: [
      {
        uid: 1,
        name: "xhw",
      },
      {
        uid: 2,
        name: "xhw233",
      },
    ],
    friendModal: false,
    data: "",
    columns: [
      {
        title: "用户",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        key: "action",
        align: "center",
        render: (e) => (
          <Button type="primary" onClick={() => this.addFriend(e)}>
            添加
          </Button>
        ),
      },
    ],
    dataSource: [
      {
        key: "1",
        name: "xhw",
      },
    ],
  };

  //   删除好友
  handleDelete = (e) => {
    console.log(e);
    Modal.confirm({
      title: `确认删除好友${e.name}`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        // this.props.history.replace("/login");
        message.success(`已删除好友${e.name}`);
      },
    });
  };

  //   查看好友更多信息
  goFriend = (e) => {
    console.log(e);
    this.props.history.push("/main/home");
  };

  addFriend = () => {
    message.success("添加成功");
    this.toggleModal();
  };

  // 开关
  toggleModal = () => {
    const { friendModal } = this.state;
    this.setState({ friendModal: !friendModal });
    // this.searchVal.state.value = "";
  };

  //   搜索好友
  onSearch = (e) => {
    console.log(e);
    //   this.searchVal.state.value = '';
  };

  render() {
    const { list, friendModal, columns, dataSource } = this.state;
    return (
      <div className="friend">
        <div className="top">
          <h3>好友列表</h3>
          <Button onClick={this.toggleModal}>添加好友</Button>
        </div>
        <List
          className="friend_list"
          dataSource={list}
          size="large"
          bordered
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    this.handleDelete(item);
                  }}
                  type="danger"
                >
                  删除
                </Button>,
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    this.goFriend(item);
                  }}
                  type="primary"
                >
                  更多
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar />}
                title={item.name}
                description="此用户很赖，没有介绍"
              />
            </List.Item>
          )}
        />
        {/* 好友拟态框 */}
        <Modal
          title="添加好友"
          visible={friendModal}
          onCancel={this.toggleModal}
          footer={[
            <Button key="back" onClick={this.toggleModal}>
              取消
            </Button>,
          ]}
        >
          <div id="friend_wrap">
            {/* <div className="">
                <span>标题</span>
                <Input
                  ref={(c) => (this.name = c)}
                  style={{ width: "70%" }}
                ></Input>
              </div>
              <div className="content">
                <span>内容</span>
                <Input.TextArea
                  ref={(c) => (this.name = c)}
                  style={{ width: "70%" }}
                  autoSize={{ minRows: 5, maxRows: 8 }}
                ></Input.TextArea>
              </div> */}
            <Input.Search
              placeholder="输入关键字搜索好友"
              ref={(c) => (this.searchVal = c)}
              onSearch={this.onSearch}
              enterButton
            />
            <Table
              className="table"
              pagination={false}
              columns={columns}
              dataSource={dataSource}
              bordered
            ></Table>
          </div>
        </Modal>
      </div>
    );
  }
}
