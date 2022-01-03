import ajax from './ajax.js';

const BASE = 'http://localhost:8000';


// 登录接口
export const reqLogin = (name, pwd) => ajax('/login', { name, pwd }, "POST");

// 注册接口
export const reqRegister = (name, pwd) => ajax('/register', { name, pwd }, "POST");

// 用户列表接口
export const reqUserList = (data = {}) => ajax('/users', data);

// 贴文列表接口
export const reqNoteList = (data = {}) => ajax('/notelist', data);

// 添加贴文接口
export const reqAddNote = (title, content, tag, uid) => ajax('/addnote', { title, content, uid, tag }, "POST");

// 删除贴文接口
export const reqDelNote = (nid, uid) => ajax('/deletenote', { uid, nid }, "POST");

// 修改贴文接口
export const reqUpdateNote = (title, content, tag, uid) => ajax('/updatenote', { title, content, uid, tag }, "POST");

// 获取标签接口
export const reqTagList = () => ajax('/taglist');

// 添加好友接口
export const reqAddFriend = (uid, fid) => ajax('/addfriend', { uid, fid }, "POST");

// 删除好友接口
export const reqDelFriend = (uid, fid) => ajax('/deletefriend', { uid, fid }, "POST");

// 获取好友列表接口
export const reqFriendList = (uid) => ajax('/friendlist', { uid });

// 添加评论接口
export const reqAddComment = (content, nid, uid) => ajax('/addcomment', { content, nid, uid }, "POST");

// 删除评论接口
export const reqDelComment = (cid, uid) => ajax('/deletecomment', { cid, uid }, "POST");

// 获取评论接口
export const reqCommentList = (nid) => ajax('/commentlist', { nid });

// 点赞接口
export const reqPraise = (nid, uid) => ajax('/praise', { nid, uid }, "POST");

// 取消点赞接口
export const reqCancelPraise = (nid, uid) => ajax('/cancelpraise', { nid, uid }, "POST");

// 检查是否点赞接口
export const reqCheckPraise = (nid, uid) => ajax('/ifpraise', { nid, uid });

