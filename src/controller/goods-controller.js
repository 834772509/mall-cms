const goodsService = require("../service/goods-service");

// 商品商品模块
class GoodsController {
  // 创建商品
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const goods = ctx.request.body;

    // 增加数据
    const result = await goodsService.create(goods);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "增加商品成功~" : "增加商品失败~",
    };
  }

  // 查询商品列表
  async list(ctx, next) {
    // 获取数据
    const { name, address, status, offset, size } = ctx.request.body;

    const [result, totalCount] = await goodsService.list(
      name,
      address,
      status,
      offset,
      size
    );
    ctx.body = {
      code: 0,
      data: { list: result, totalCount: totalCount },
    };
  }

  // 获取某个商品信息
  async detail(ctx, next) {
    const { goodsId } = ctx.params;
    const result = await goodsService.getGoodsById(goodsId);
    ctx.body = { code: 0, data: result[0] };
  }

  // 编辑商品信息
  async update(ctx, next) {
    const { goodsId } = ctx.params;
    const goods = ctx.request.body;

    const result = await goodsService.update(goodsId, goods);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "编辑商品成功~" : "编辑商品失败~",
    };
  }

  // 删除商品
  async remove(ctx, next) {
    const { goodsId } = ctx.params;
    const result = await goodsService.remove(goodsId);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "删除商品成功~" : "删除商品失败~",
    };
  }
}

module.exports = new GoodsController();
