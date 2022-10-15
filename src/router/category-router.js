const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth-middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/category-controller");

const categoryRouter = new Router({ prefix: "/category" });

// 创建类别
categoryRouter.post("/", verifyAuth, create);
// 获取类别列表
categoryRouter.post("/list", verifyAuth, list);
// 获取某个类别信息
categoryRouter.get("/:categoryId", verifyAuth, detail);
// 更新类别信息
categoryRouter.patch("/:categoryId", verifyAuth, update);
// 删除类别
categoryRouter.delete("/:categoryId", verifyAuth, remove);

module.exports = categoryRouter;
