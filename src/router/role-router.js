const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth-middleware");
const {
  create,
  list,
  detail,
  menu,
  menuIds,
  update,
  remove,
} = require("../controller/role-controller");

const roleRouter = new Router({ prefix: "/role" });

// 创建角色
roleRouter.post("/", verifyAuth, create);
// 获取角色列表
roleRouter.post("/list", verifyAuth, list);
// 获取某个角色信息
roleRouter.get("/:roleId", verifyAuth, detail);
// 查询角色菜单树
roleRouter.get("/:roleId/menu", verifyAuth, menu);
// 查询角色菜单ids
roleRouter.get("/:roleId/menuIds", verifyAuth, menuIds);
// 更新角色信息
roleRouter.patch("/:roleId", verifyAuth, update);
// 删除角色
roleRouter.delete("/:roleId", verifyAuth, remove);

module.exports = roleRouter;
