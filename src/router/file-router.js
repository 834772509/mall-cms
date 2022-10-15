const Router = require("koa-router");
const { avatarHandler, pictureResize, pictureHandler } = require("../middleware/file-middleware");
const { verifyAuth } = require("../middleware/auth-middleware");
const { saveAvatarInfo, savePictureInfo } = require("../controller/file-controller");

// 上传接口
const fileRouter = new Router({ prefix: "/upload" });

// 上传头像
fileRouter.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo);

// 上传图片
fileRouter.post("/picture", verifyAuth, pictureHandler, pictureResize, savePictureInfo);

module.exports = fileRouter;
