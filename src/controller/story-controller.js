const storyService = require("../service/story-service");

// 故事模块
class StoryController {
  // 创建故事
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const story = ctx.request.body;

    // 增加数据
    const result = await storyService.create(story);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "增加故事成功~" : "增加故事失败~",
    };
  }

  // 查询故事列表
  async list(ctx, next) {
    // 获取数据
    const { offset, size } = ctx.request.body;
    const [result, totalCount] = await storyService.list(offset, size);
    ctx.body = {
      code: 0,
      data: { list: result, totalCount: totalCount },
    };
  }

  // 获取某个故事信息
  async detail(ctx, next) {
    const { storyId } = ctx.params;
    const result = await storyService.getstoryById(storyId);
    ctx.body = { code: 0, data: result[0] };
  }

  // 编辑故事信息
  async update(ctx, next) {
    const { storyId } = ctx.params;
    const { name } = ctx.request.body;
    const result = await storyService.update(storyId, name);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "编辑故事成功~" : "编辑故事失败~",
    };
  }

  // 删除故事
  async remove(ctx, next) {
    const { storyId } = ctx.params;
    const result = await storyService.remove(storyId);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "删除故事成功~" : "删除故事失败~",
    };
  }
}

module.exports = new StoryController();
