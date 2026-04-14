import express from "express";
import bodyParser from "body-parser";
import router from "./router/index.js";
import './database/index.js';
const app = express();
// const history = require('connect-history-api-fallback');
const PORT = process.env.PORT || 3001;
// 解析请求体
app.use(bodyParser.json());
// 配置访问路由
app.use('/api',router);
// 重定向前端history路由
// app.use(history());
// 部署静态资源
// app.static(path.resolve(__dirname,'./dist'));
// 启动服务
app.listen(PORT,()=>{
    console.log('server start');
})
