const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth-middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/story-controller");

const storyRouter = new Router({ prefix: "/story" });

// 创建故事
storyRouter.post("/", verifyAuth, create);
// 获取故事列表
storyRouter.post("/list", verifyAuth, list);
// 获取某个故事信息
storyRouter.get("/:storyId", verifyAuth, detail);
// 更新故事信息
storyRouter.patch("/:storyId", verifyAuth, update);
// 删除故事
storyRouter.delete("/:storyId", verifyAuth, remove);

module.exports = storyRouter;
