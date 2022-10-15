const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth-middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/goods-controller");

const goodsRouter = new Router({ prefix: "/goods" });

// 创建类别
goodsRouter.post("/", verifyAuth, create);
// 获取类别列表
goodsRouter.post("/list", verifyAuth, list);
// 获取某个类别信息
goodsRouter.get("/:goodsId", verifyAuth, detail);
// 更新类别信息
goodsRouter.patch("/:goodsId", verifyAuth, update);
// 删除类别
goodsRouter.delete("/:goodsId", verifyAuth, remove);

module.exports = goodsRouter;
