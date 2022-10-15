const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth-middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/department-controller");

const departmentRouter = new Router({ prefix: "/department" });

// 创建部门
departmentRouter.post("/", verifyAuth, create);
// 获取部门列表
departmentRouter.post("/list", verifyAuth, list);
// 获取某个部门信息
departmentRouter.get("/:departmentId", verifyAuth, detail);
// 更新部门信息
departmentRouter.patch("/:departmentId", verifyAuth, update);
// 删除部门
departmentRouter.delete("/:departmentId", verifyAuth, remove);

module.exports = departmentRouter;
