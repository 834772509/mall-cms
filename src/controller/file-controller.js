const fileService = require("../service/file-service");
const userService = require("../service/user-service");
const config = require("../app/config");

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 获取图像相关信息
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    // 将图像信息数据保存到数据库中
    await fileService.createAvatar(filename, mimetype, size, id);

    // 将图片地址保存到users表中
    const avatarURL = `${config.APP_HOST}:${config.APP_PORT}/users/${id}/avatar`;
    await userService.updateAvatarUrlById(id, avatarURL);

    // 返回结果
    ctx.body = {
      code: 200,
      message: "上传头像成功",
    };
  }
  async savePictureInfo(ctx, next) {
    // 获取图像相关信息
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    // 将所有文件信息保存到数据库中
    for (const item of files) {
      const { filename, mimetype, size } = item;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }

    // 返回结果
    ctx.body = {
      code: 200,
      message: "上传文件成功",
    };
  }
}

module.exports = new FileController();
