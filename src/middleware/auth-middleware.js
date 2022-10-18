const errType = require("../constants/error-types");
const md5Password = require("../utils/password-handle");
const userService = require("../service/user-service");
const authService = require("../service/auth-service");
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");

// 登录验证
const verifyLogin = async (ctx, next) => {
  console.log("验证登录的middleware");

  // 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRE);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断用户是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断密码是否和数据库中的密码是否一致
  if (user.password !== md5Password(password)) {
    const error = new Error(errType.PASSWORD_ISINCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  // 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errType.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 验证 token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithm: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errType.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

// 权限验证（重要）
const verifyPermission = async (ctx, next) => {
  console.log("验证权限的middleware");
  // 获取参数
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace("Id", "");
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  // 查询是否具备权限
  try {
    const isPermission = await authService.checkResource(
      tableName,
      resourceId,
      id
    );
    if (!isPermission) throw new Error();
    await next();
  } catch (err) {
    const error = new Error(errType.UNPERMISSION);
    return ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
