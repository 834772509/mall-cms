const Router = require("koa-router");
const { verifyAuth, verifyPermission } = require("../middleware/auth-middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo,
} = require("../controller/moment-controller");
const { verifyLabelsExists } = require("../middleware/label-middleware");

const momentRouter = new Router({ prefix: "/moment" });

// 创建动态
momentRouter.post("/", verifyAuth, create);

// 获取动态详情
momentRouter.get("/:momentId", detail);

// 查询多条动态详情
momentRouter.get("/", list);

// 更新动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
// 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

// 给动态增加标签
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelsExists, addLabels);

// 动态配图的服务
momentRouter.get("/images/:filename", fileInfo);

module.exports = momentRouter;
