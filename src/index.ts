const express = require('express');
const path = require('path');
const app = new express();
const bodyParser = require("body-parser");
const router = require(path.resolve(__dirname,'./router/index.js'));
// const history = require('connect-history-api-fallback');
const PORT = process.env.PORT || 3001;
require(path.resolve(__dirname,'./database/index.js'));
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
