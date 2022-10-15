const categoryService = require("../service/category-service");

// 商品类别模块
class DepartmentController {
  // 创建类别
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const category = ctx.request.body;

    // 增加数据
    const result = await categoryService.create(category);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "增加类别成功~" : "增加类别失败~",
    };
  }

  // 查询类别列表
  async list(ctx, next) {
    // 获取数据
    const { name, offset, size } = ctx.request.body;
    const [result, totalCount] = await categoryService.list(name, offset, size);
    ctx.body = {
      code: 0,
      data: { list: result, totalCount: totalCount },
    };
  }

  // 获取某个类别信息
  async detail(ctx, next) {
    const { categoryId } = ctx.params;
    const result = await categoryService.getcategoryById(categoryId);
    ctx.body = { code: 0, data: result[0] };
  }

  // 编辑类别信息
  async update(ctx, next) {
    const { categoryId } = ctx.params;
    const { name } = ctx.request.body;
    const result = await categoryService.update(categoryId, name);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "编辑类别成功~" : "编辑类别失败~",
    };
  }

  // 删除类别
  async remove(ctx, next) {
    const { categoryId } = ctx.params;
    const result = await categoryService.remove(categoryId);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "删除类别成功~" : "删除类别失败~",
    };
  }
}

module.exports = new DepartmentController();
