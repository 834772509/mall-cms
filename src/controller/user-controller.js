const fs = require("fs");
const fileService = require("../service/file-service");
const userService = require("../service/user-service");
const { AVATAR_PATH } = require("../constants/file-path");

// 用户模块
class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 增加数据
    const result = await userService.create(user);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "创建用户成功~" : "创建用户失败~",
    };
  }

  // 查询用户列表
  async list(ctx, next) {
    const result = await userService.list();
    ctx.body = { code: 0, data: { list: result, totalCount: result.length } };
  }

  // 查询用户信息
  async userInfo(ctx, next) {
    const { userId } = ctx.params;
    const result = await userService.getUserByID(userId);
    ctx.body = { code: 0, data: result[0] };
  }

  // 查询用户头像
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    // 返回头像信息
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }

  // 编辑用户信息
  async update(ctx, next) {}

  // 删除用户
  async remove(ctx, next) {
    const { userId } = ctx.params;
    const result = await userService.remove(userId);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "删除用户成功~" : "删除用户失败~",
    };
  }
}

module.exports = new UserController();
