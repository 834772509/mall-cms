# mall-cms

基于 Node.js、koa、koa-router、mysql2、jsonwebtoken 等后台系统解决方案

## 介绍

本项目为后台管理系统 Demo 项目，数据来源于网络，具有用户管理、部门管理、菜单管理、角色管理、 商品类别、商品信息等管理接口。

### 项目图片

### 项目技术栈

- 开发工具 : Visual Studio Code
- 编程语言 : JavaScript
- 构建工具 : Node.js
- 后端框架 : koa 2.x
- 路由工具 : koa Router 10.x
- 工具库 : nodemon + jsonwebtoken
- 数据库工具 : mysql2
- 代码规范 : EditorConfig + Prettier
- 提交规范 : Commitizen + Commitlint

### 项目结构

```
├─src
  ├─app 主程序
  ├─constants 常量
  ├─controller 控制层
  ├─middleware 中间件
  ├─router 路由
  ├─service 数据库层
  └─utils 工具类
├─.env 环境配置文件
└─package.json 项目配置文件
```

### 项目接口

PostMan 配置文件: [mall_cms.json](mall_cms.postman_collection.json)

## 使用

### 配置数据库

1. 创建数据库: `mall_cms`
2. 导入数据文件: [mall_cms.sql](mall_cms.sql)

### 配置项目

新建 .env 文件

```
# 地址
APP_HOST=0.0.0.0
# 端口
APP_PORT=8000
# 数据库地址
MYSQL_HTOST=localhost
# 数据库端口号
MYSQL_POST=3306
# 数据库名称
MYSQL_DATABASE=mall_cms
# 用户名
MYSQL_USER=root
# 密码
MYSQL_PASSWORD=root
```

### 运行项目

1. 安装依赖: `npm install`
2. 启动项目: `npm run start`

### 打包部署

1. 安装依赖: `npm install`
2. 打包项目: `npm run build`
3. 将 dist 目录下的可执行文件部署至服务器
4. 配置.env
