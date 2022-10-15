const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

// 验证Token模块
class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 60 * 60 * 24,
    });
    ctx.body = { code: 0, data: { id, name, token } };
  }
  async success(ctx, next) {
    ctx.body = {
      code: 200,
      message: "授权成功",
    };
  }
}

module.exports = new AuthController();
