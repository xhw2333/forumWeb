import React, { Component } from "react";
import { Input, Select, Button } from "antd";
import "./publish.scss";
import ajax from "../../api/ajax";

export default class publish extends Component {
  state = {
    tagArr: [
      {
        title: "学习",
        color: "blue",
      },
      {
        title: "生活",
        color: "red",
      },
      {
        title: "美食",
        color: "volcano",
      },
      {
        title: "其他",
        color: "green",
      },
    ],
  };

  commitNote = () => {
    const {
      content: {
        resizableTextArea: {
          props: { value: content },
        },
      },
      title: {
        state: { value: title },
      },
    } = this || {};
    console.log(content, title);
    const data = {
      content,
      title
    }
    ajax('',data,"POST").then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  };

  render() {
    const { tagArr } = this.state;
    return (
      <div className="publish">
        <div className="top">
          <h3 className="title">贴文编辑</h3>
        </div>
        <div className="pub_note_wrap">
          <div className="">
            <span>标题：</span>
            <Input
              ref={(c) => (this.title = c)}
              style={{ width: "60%" }}
            ></Input>
          </div>
          <div className="">
            <span>标签：</span>
            <div style={{ width: "60%" }}>
              <Select
                defaultValue={0}
                size="small"
                onBlur={this.addTag}
                onChange={this.handleTag}
              >
                {tagArr.map((tag, index) => (
                  <Select.Option value={index} key={index}>
                    {tag.title}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="content">
            <span>内容：</span>
            <Input.TextArea
              ref={(c) => (this.content = c)}
              style={{ width: "60%" }}
              autoSize={{ minRows: 5, maxRows: 8 }}
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
              type="primary"
              className="btn"
              size="large"
              onClick={this.commitNote}
            >
              保存
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
