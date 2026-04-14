const path = require("path");
const loginService = require(path.resolve(
  __dirname,
  "../server/loginServer.js"
));
const { isLogin } = require(path.resolve(__dirname, "../utils/index.js"));
const register = async (req, res) => {
  const { username, password, name } = req.body || {};
  if (!username || !password || !name) {
    return;
  }
  const params = {
    username,
    password,
    name,
  };
  try {
    await loginService.register(params);
    res.status(200).send({ status: 200,success:true, data: { message: "账号注册成功" } });
  } catch (err) {
    // 用户名重复
    if (err.code === 11000) {
      res.status(400).send({
        status: 400,
        success: false,
        data: {
          error: {
            message: "用户已存在,请重新输入",
          },
        },
      });
      return;
    }
    res.status(err?.status || 500).send({
      status: err?.status || 500,
      success: false,
      data: {
        error: err?.message ? { message: err.message } : err,
      },
    });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return;
  }
  const params = {
    username,
    password,
  };
  try {
    const userInfo = await loginService.login(params);
    res.status(200).send({
      status: 200,
      success: true,
      data: userInfo,
    });
  } catch (err) {
    res.status(err?.status || 500).send({
      status: err?.status || 500,
      success: false,
      data: {
        error: err?.message ? { message: err.message } : err,
      },
    });
  }
};
const getUserInfo = async (req, res) => {
  try{
    const userInfo = await loginService.getUserInfo(req.userInfo);
    res.status(200).send({
      status: 200,
      success: true,
      data: userInfo,
    });
  }catch(err){
    res.status(err?.status || 500).send({
      status: err?.status || 500,
      success: false,
      data: {
        error: err?.message ? { message: err.message } : err,
      },
    });
  }
};
const getUserInfoMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ").pop();
    if (!token) throw new Error();
    const id = isLogin(token);
    if (!id) throw new Error();
    const userInfo = await loginService.getUserInfoMiddleware(id);
    req.userInfo = userInfo;
    next();
  } catch (err) {
    res.status(500).send({
      status: err?.status || 500,
      success: false,
      data: {
        error: "用户信息获取异常或登录过期，请重新登录",
      },
    })
  }
};
module.exports = {
  register,
  login,
  getUserInfo,
  getUserInfoMiddleware
};
