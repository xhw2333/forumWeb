import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './header.scss';

export default class header extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo_wrap">
                    <h1>LOGO</h1>
                    {/* <img src="" alt="" /> */}
                </div>
                <div className="nav">
                    <NavLink to="/main/home" className="item">首页</NavLink>
                    <NavLink to="/main/note" className="item">创作</NavLink>
                    <NavLink to="/main/friend" className="item">好友</NavLink>
                    <NavLink to="/main/me" className="item">个人中心</NavLink>
                </div>
                <div className="login_wrap">
                    退出
                </div>
            </div>
        )
    }
}

