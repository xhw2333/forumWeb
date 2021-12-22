import React, { Component } from "react";
import { List, Avatar, Button, Modal, message, Input, Table } from "antd";
import ajax from '../../api/ajax';
import "./friend.scss";

export default class friend extends Component {
  state = {
    friendList: [
      {
        uid: 1,
        name: "xhw",
      },
      {
        uid: 2,
        name: "xhw233",
      },
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

  // 获取好友列表
  getFriendList = (uid=1)=>{
    ajax('/friendlist',{uid}).then(res=>{
      console.log(res);
      const {status,msg,data} = res;
      if(status !== 1) return message.error(msg,1);
      message.success("获取好友列表成功");
      this.setState({friendList:data});
    }).catch(err=>{
      console.log(err);
    })
  }

  componentWillMount(){
    // this.getFriendList();
  }

  render() {
    const { friendList, friendModal, columns, dataSource } = this.state;
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
