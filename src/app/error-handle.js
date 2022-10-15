const errType = require("../constants/error-types");

// 错误处理
const errorHandler = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errType.NAME_OR_PASSWORD_IS_REQUIRE:
      // Bad Request
      status = 400;
      message = "用户名或者密码不能为空";
      break;
    case errType.USER_ALREADY_EXISTS:
      // coflict
      status = 409;
      message = "用户名已存在";
      break;
    case errType.USER_DOES_NOT_EXISTS:
      // Bad Request
      status = 400;
      message = "用户名不存在";
      break;
    case errType.PASSWORD_ISINCORRENT:
      // Bad Request
      status = 400;
      message = "密码不正确";
      break;
    case errType.UNAUTHORIZATION:
      status = 401;
      message = "无效的token";
      break;
    case errType.UNPERMISSION:
      status = 401;
      message = "您不具备操作的权限";
      break;
    default:
      status = 404;
      message = "Not Found";
      break;
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
