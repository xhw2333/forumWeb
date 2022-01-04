import React, { Component } from "react";
import { List, Avatar, Button, Modal, message, Input, Table } from "antd";
import ajax from "../../api/ajax";
import global from "../../store/index";
import "./friend.scss";

export default class friend extends Component {
  state = {
    friendList: [
      // {
      //   uid: 1,
      //   name: "xhw",
      // },
      // {
      //   uid: 2,
      //   name: "xhw233",
      // },
    ],
    friendModal: false, //好友搜索展示框
    // 搜索好友展示用
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
    userList: [
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
        const { user } = global;
        ajax("/deletefriend", { uid: user.uid, fid: e.id }, "POST")
          .then((res) => {
            console.log(res);
            const { status, msg } = res;
            if (status !== 1) return message.error(msg, 1);
            message.success(`已删除好友${e.name}`, 1);
            this.getFriendList(user.uid);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  //   查看好友更多信息
  goFriend = (e) => {
    this.props.history.push({
      pathname: "/main/home/",
      query: { uid: e.id },
    });
  };

  // 添加好友
  addFriend = (e) => {
    const { user } = global;
    console.log(e);
    if (e.id === user.uid) return message.error("不能添加自己为好友");
    ajax("/addfriend", { uid: user.uid, fid: e.id }, "POST")
      .then((res) => {
        const { msg, status } = res;
        if (status !== 1) return message.info(msg, 1);
        message.success(msg, 1);
        this.getFriendList(user.uid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 开关
  toggleModal = () => {
    const { friendModal } = this.state;
    // 清空数据
    if (this.searchVal) this.searchVal.state.value = "";
    this.setState({
      friendModal: !friendModal,
      userList: [],
    });
  };

  //   搜索好友
  onSearch = (e) => {
    console.log(e);
    ajax("/searchuser", { key: e }, "POST")
      .then((res) => {
        console.log(res);
        let { data, status, msg } = res;
        if (status !== 1) return message.error(msg, 1);
        data = data.map((user, index) => {
          return {
            key: index,
            ...user,
          };
        });
        this.setState({ userList: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 获取好友列表
  getFriendList = (uid = 1) => {
    ajax("/friendlist", { uid })
      .then((res) => {
        console.log(res);
        const { status, msg, data } = res;
        if (status !== 1) return message.error(msg, 1);
        // message.success("获取好友列表成功", 1);
        this.setState({ friendList: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount() {
    // 获取用户id
    const { user } = global;
    this.getFriendList(user.uid);
  }

  render() {
    const { friendList, friendModal, columns, userList } = this.state;
    return (
      <div className="friend">
        <div className="top">
          <h3>好友列表</h3>
          <Button onClick={this.toggleModal}>添加好友</Button>
        </div>
        <List
          className="friend_list"
          dataSource={friendList}
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
            <Input.Search
              placeholder="输入关键字搜索好友"
              ref={(c) => (this.searchVal = c)}
              onSearch={this.onSearch}
              // allowClear
              enterButton
            />
            <Table
              className="table"
              pagination={false}
              columns={columns}
              dataSource={userList}
              bordered
            ></Table>
          </div>
        </Modal>
      </div>
    );
  }
}
