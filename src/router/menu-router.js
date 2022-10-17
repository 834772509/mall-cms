const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth-middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/menu-controller");

const menuRouter = new Router({ prefix: "/menu" });

// 创建菜单
menuRouter.post("/", verifyAuth, create);
// 获取菜单列表
menuRouter.post("/list", verifyAuth, list);
// 获取某个菜单信息
menuRouter.get("/:menuId", verifyAuth, detail);
// 更新菜单信息
menuRouter.patch("/:menuId", verifyAuth, update);
// 删除菜单
menuRouter.delete("/:menuId", verifyAuth, remove);

module.exports = menuRouter;
