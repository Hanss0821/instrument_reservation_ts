const path = require('path');
const jwt = require('jsonwebtoken');
const {passwordId} = require(path.resolve(__dirname,'../static/static_data.js'));
// const {models:{User}} = require(path.resolve(__dirname,'../database/index.js'));
// 是否已登录
function isLogin(raw){
    // 用户是否存在
    const {id} = jwt.verify(raw,passwordId);
    return id || null;
}


module.exports = {
    isLogin
}   