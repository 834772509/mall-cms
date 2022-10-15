const Router = require("koa-router");
const {
  create,
  list,
  userInfo,
  avatarInfo,
} = require("../controller/user-controller");
const { verifyUser, handlePassword } = require("../middleware/user-middleware");
const { verifyAuth } = require("../middleware/auth-middleware");

const userRouter = new Router({ prefix: "/users" });

// 用户登录
userRouter.post("/", verifyUser, handlePassword, create);

// 用户列表
userRouter.post("/list", verifyAuth, list);

// 查询用户
userRouter.get("/:userId", verifyAuth, userInfo);

// 用户头像
userRouter.get("/:userId/avatar", avatarInfo);

module.exports = userRouter;
