const Router = require("koa-router");
const { login, success } = require("../controller/auth-controller.js");
const { verifyLogin, verifyAuth } = require("../middleware/auth-middleware");

// 授权路由
const authRouter = new Router();
authRouter.post("/login", verifyLogin, login);
authRouter.post("/test", verifyAuth, success);

module.exports = authRouter;
