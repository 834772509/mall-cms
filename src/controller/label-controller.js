const service = require("../service/label-service");

// 标签模块
class LabelController {
  // 增加标签
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await service.create(name);
    ctx.body = result;
  }
  // 列出所有标签
  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await service.getLabels(limit, offset);
    ctx.body = result;
  }
}

module.exports = new LabelController();
