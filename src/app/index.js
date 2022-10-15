const Koa = require("Koa");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handle");
const useRoutes = require("../router");

const app = new Koa();

// 解析 body 参数
app.use(bodyParser());

// 业务路由
useRoutes(app);

// 错误处理
app.on("error", errorHandler);

module.exports = app;
