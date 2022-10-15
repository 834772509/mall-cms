const path = require("path");
const multer = require("koa-multer");
const Jimp = require("jimp");
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path");

// 上传头像
const avatarUpload = multer({
  dest: AVATAR_PATH,
});

const avatarHandler = avatarUpload.single("avatar");

// 上传图片
const pictureUpload = multer({
  dest: PICTURE_PATH,
});

const pictureHandler = pictureUpload.array("picture", 20);

const pictureResize = async (ctx, next) => {
  // 获取所有图像信息
  const files = ctx.req.files;

  // 对图像进行处理
  for (const item of files) {
    const destPath = path.join(item.destination, item.filename);
    Jimp.read(item.path).then((image) => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
    });
  }
  await next();
};

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
};
