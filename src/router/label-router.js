const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth-middleware");
const { create, list } = require("../controller/label-controller");

const labelRouter = new Router({ prefix: "/label" });

// 创建标签
labelRouter.post("/", verifyAuth, create);
labelRouter.get("/", list);

module.exports = labelRouter;
