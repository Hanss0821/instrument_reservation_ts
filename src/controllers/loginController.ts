import { Request, Response, NextFunction } from 'express'
import { RegisterBody, LoginBody } from '../types/index.js'
import loginService from "../server/loginServer.js";
import { isLogin } from "../utils/index.js";

const register = async (req:Request<{},{},RegisterBody>, res:Response):Promise<void> => {
  const { username, password, name } = req.body || {};
  if (!username || !password || !name) {
    res.status(400).send({ status: 400, success: false, data: { error: { message: '参数不完整' } } })
    return;
  }
  try {
    await loginService.register({username,password,name});
    res.status(200).send({ status: 200,success:true, data: { message: "账号注册成功" } });
  } catch (err) {
    // 用户名重复
    if ((err as any)?.code === 11000) {
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
    const status = (err as any)?.status || 500
    res.status(status).send({
      status,
      success: false,
      data: {
        error:  (err as any)?.message,
      },
    });
  }
};

const login = async (req:Request<{},{},LoginBody>, res:Response):Promise<void> => {
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
    const status = (err as any)?.status || 500;
    const message = (err as any)?.message || "登录失败" 
    res.status(status).send({
      status,
      success: false,
      data: {
        error: { message },
      },
    });
  }
};
const getUserInfo = async (req:Request, res:Response):Promise<void> => {
  try{
    const userInfo = await loginService.getUserInfo(req.userInfo);
    res.status(200).send({
      status: 200,
      success: true,
      data: userInfo,
    });
  }catch(err){
    const status = (err as any)?.status || 500;
    const message = (err as any)?.message || "获取用户信息失败" 
    res.status(status).send({
      status,
      success: false,
      data: {
        error: { message } ,
      },
    });
  }
};
const getUserInfoMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  const { authorization="" } = req.headers;
  try {
    const token = authorization.split(" ").pop();
    if (!token) throw new Error();
    const id = isLogin(token);
    if (!id) throw new Error();
    const userInfo = await loginService.getUserInfoMiddleware(id);
    req.userInfo = userInfo;
    next();
  } catch (err) {
    const status = (err as any)?.status || 500;
    res.status(status).send({
      status,
      success: false,
      data: {
        error: "用户信息获取异常或登录过期，请重新登录",
      },
    })
  }
};
export default {
  register,
  login,
  getUserInfo,
  getUserInfoMiddleware
};
