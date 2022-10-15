const fs = require("fs");
const momentService = require("../service/moment-service");
const fileService = require("../service/file-service");
const { PICTURE_PATH } = require("../constants/file-path");

// 动态模块
class MomentController {
  // 增加动态
  async create(ctx, next) {
    // 获取数据
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 将数据插入到数据库
    const result = await momentService.create(userId, content);

    ctx.body = result;
  }

  // 获取动态详情
  async detail(ctx, next) {
    // 获取数据
    const momentId = ctx.params.momentId;

    // 工具id查询数据
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  // 查询多条数据
  async list(ctx, next) {
    // 获取数据
    const { offset, size } = ctx.query;
    // 查询类别
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }

  // 修改动态
  async update(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 修改内容
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  // 删除动态
  async remove(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;

    // 删除内容
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }

  // 增加动态标签
  async addLabels(ctx, next) {
    // 获取标签和动态id
    const { labels } = ctx;
    const { momentId } = ctx.params;

    // 增加所有的标签
    for (const item of labels) {
      // 判断标签是否已经和动态有关系
      const isExist = await momentService.hasLabel(momentId, item.id);
      if (!isExist) {
        await momentService.addLabels(momentId, item.id);
      }
    }

    // 返回结果
    ctx.body = {
      code: 200,
      message: "标签增加成功",
    };
  }

  // 动态配图的服务
  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFileName(filename);
    const { size } = ctx.query;
    const sizes = ["small", "middle", "large"];
    if (sizes.some((item) => item === size)) {
      filename = filename + "-" + size;
    }

    ctx.response.set("Content-Type", fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MomentController();
