const errType = require("../constants/error-types");
const service = require("../service/user-service");
const md5Password = require("../utils/password-handle");

// 验证用户名和密码
const verifyUser = async (ctx, next) => {
  // 获取用户名和密码
  const { name, password } = ctx.request.body;
  // 判断用户名或者密码不能为空
  if (!name || !password) {
    const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRE);
    return ctx.app.emit("error", error, ctx);
  }
  // 判断用户名是否被注册
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errType.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

// 加密 密码
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
