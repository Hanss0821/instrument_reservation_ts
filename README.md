# instrument-reservation-backend

仪器预约系统后端服务（Node.js + Express + MongoDB）。

当前仓库已具备 TypeScript 编译链路（`typescript`、`ts-node-dev`、`tsconfig.json`），但业务代码仍以 CommonJS JavaScript 为主（`require/module.exports` + `.js` 文件）。  
本 README 目标是指导你将项目**完整迁移到 TypeScript**。

## 当前状态

- 已具备 TS 基础设施：
  - `dev`: `ts-node-dev --respawn --transpile-only src/index.ts`
  - `build`: `tsc`
  - `start`: `node dist/index.js`
  - `tsconfig.json` 已配置 `strict: true`
- 仍未完成迁移：
  - `src/index.ts` 仍使用 `require`
  - `src/controllers`、`src/server`、`src/router`、`src/database`、`src/utils` 仍为 `.js`

## 环境准备

### 1) 安装依赖

```bash
npm install
```

### 2) 配置环境变量

当前仓库包含：

- `env/local.env`
- `env/prod.env`

请根据运行环境补充数据库连接等必要变量（例如 MongoDB 连接串、JWT 密钥等）。

## 启动方式

开发模式：

```bash
npm run dev
```

生产构建与启动：

```bash
npm run build
npm run start
```

## TypeScript 迁移方案（推荐顺序）

## 第 1 阶段：统一入口与模块语法

1. 将 `src/index.ts` 从 CommonJS 改为 ES Module 写法：
   - `const express = require('express')` -> `import express from 'express'`
   - `module.exports` -> `export` / `export default`
2. 清理硬编码 `.js` 引用（如 `./router/index.js`），改为 TS 友好的相对引用。
3. 补充基础类型：
   - `Request` / `Response` / `NextFunction`
   - `process.env` 读取处增加空值保护

## 第 2 阶段：按目录批量迁移 `.js` -> `.ts`

建议迁移顺序（由外到内）：

1. `src/router/index.js` -> `src/router/index.ts`
2. `src/controllers/*.js` -> `src/controllers/*.ts`
3. `src/server/*.js` -> `src/server/*.ts`
4. `src/database/*.js` -> `src/database/*.ts`
5. `src/utils/index.js` -> `src/utils/index.ts`

每迁移一个目录，立即执行一次：

```bash
npm run build
```

确保错误不会累计。

## 第 3 阶段：建立核心领域类型

建议新增 `src/types/`（或按模块 colocate）：

- `User`
- `Device`
- `ReserveRecord`
- `ApiResponse<T>`
- `JwtPayload`

优先消除以下隐患：

- 控制器 `req.body` 无类型约束
- 服务层返回值类型不稳定
- 中间件 `req.userInfo` 扩展缺少声明（需扩展 Express Request 接口）

## 第 4 阶段：收敛严格模式告警

在 `strict: true` 下，重点处理：

- `any` 与隐式 `any`
- 可空值（`undefined/null`）分支
- 异常对象 `err` 类型收窄（`unknown` -> 类型守卫）

必要时可临时使用 `Partial<T>`、类型守卫函数，避免直接关闭严格选项。

## 建议的迁移完成标准

满足以下条件即可视为迁移完成：

1. `src` 下业务源码不再存在 `.js`（仅保留静态数据文件除外）
2. 不再使用 `require/module.exports`
3. `npm run build` 无 TypeScript 错误
4. 关键接口联调通过（登录、获取设备、预约新增/修改/删除、查询时间表）

## 已有接口（便于回归验证）

统一前缀：`/api`

- `POST /register` 注册
- `POST /login` 登录
- `POST /getUserInfo` 获取用户信息
- `GET /getDeviceList` 获取设备列表
- `POST /addReserveRecord` 新增预约
- `POST /getUserReserveRecord` 查询用户预约
- `POST /deleteRecordByone` 删除预约
- `POST /modifyRecord` 修改预约
- `POST /getDeviceTimeList` 获取设备时间表

可配合 `src/http/login.http` 进行本地接口调试。

## 下一步建议

如果你愿意，我可以直接继续帮你做**第一轮真实迁移**（先把 `index.ts` + `router` + `controllers` 转成 TypeScript，并保证可编译）。  
这样你可以在一个可运行的中间状态上继续迭代。  
