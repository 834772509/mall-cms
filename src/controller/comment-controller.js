const service = require("../service/comment-service");

// 评论模块
class CommentController {
  // 发表评论
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;
    const result = await service.create(momentId, content, id);
    ctx.body = result;
  }

  // 回复评论
  async reply(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const result = await service.reply(momentId, content, id, commentId);
    ctx.body = result;
  }

  // 修改评论
  async update(ctx, next) {
    const { content } = ctx.request.body;
    const { commentId } = ctx.params;
    const result = await service.update(commentId, content);
    ctx.body = result;
  }
  // 删除评论
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await service.remove(commentId);
    ctx.body = result;
  }
  // 获取评论列表
  async list(ctx, next) {
    const { momentId } = ctx.request.query;
    const result = await service.getCommentByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();
