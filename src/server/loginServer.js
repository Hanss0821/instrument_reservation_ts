const path = require("path");
const jwt = require('jsonwebtoken');
const Models = require(path.resolve(__dirname,"../database/models.js"));
const {passwordId} = require(path.resolve(__dirname,"../static/static_data.js"));
// 获取数据库模型
const {
 User
} = Models;
const register = async (params) => {
  const { username, password, name } = params;
  try {
    // 存入数据库
    const user = await User.create({
      username,
      password,
      name,
    });
    return user;
  } catch (err) {
    throw err;
  }
};

const login = async (params) => {
  const { username, password } = params;
  try {
    // 查找用户
    const userInfo = await User.findOne({
      username,
    });
    // 用户未注册
    if (!userInfo) {
      throw {
        status: 400,
        success: false,
        message: "该用户未注册，请先注册",
      };
    }
    // 密码是否正确
    // require('bcrypt').compareSync(password,userInfo.password);
    const isPasswordValid = password === userInfo.password;
    if(!isPasswordValid) {
        throw {
            status: 422,
            success: false,
            message: "密码错误，请核对后在次登录",
          };
    }
    // 生成token返回
    const token = jwt.sign({
        id:String(userInfo._id),
    },passwordId); 
    return ({
        name:userInfo.name,
        userAcount:userInfo.username,
        token
    })
  } catch (err) {
    throw err;
  }
};
const getUserInfo = async(userInfo)=>{
  if(!userInfo) {
    throw {
      status: 500,
      success: false,
      message: "用户信息获取异常或登录过期，请重新登录",
    };
  }
  return {name:userInfo.name,username:userInfo.username,id:userInfo._id};
}
const getUserInfoMiddleware = async (id) => {
  if(!id)throw new Error();
  const userInfo = await User.findOne({
    _id:id,
  });
  return userInfo;
}

module.exports = {
  register,
  login,
  getUserInfo,
  getUserInfoMiddleware
};
