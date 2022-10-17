const menuService = require("../service/menu-service");

// 菜单模块
class MenuController {
  // 创建菜单
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const menu = ctx.request.body;

    // 增加数据
    const result = await menuService.create(menu);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "增加菜单成功~" : "增加菜单失败~",
    };
  }

  // 查询菜单列表
  async list(ctx, next) {
    // 获取数据
    const { name, intro, offset, size } = ctx.request.body;
    const [result, totalCount] = await menuService.list(
      name,
      intro,
      offset,
      size
    );
    ctx.body = {
      code: 0,
      data: { list: result, totalCount: totalCount },
    };
  }

  // 获取某个菜单信息
  async detail(ctx, next) {
    const { menuId } = ctx.params;
    const result = await menuService.getmenuById(menuId);
    ctx.body = { code: 0, data: result[0] };
  }

  // 编辑菜单信息
  async update(ctx, next) {
    const { menuId } = ctx.params;
    const menu = ctx.request.body;
    const result = await menuService.update(menuId, menu);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "编辑菜单成功~" : "编辑菜单失败~",
    };
  }

  // 删除菜单
  async remove(ctx, next) {
    const { menuId } = ctx.params;
    const result = await menuService.remove(menuId);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "删除菜单成功~" : "删除菜单失败~",
    };
  }
}

module.exports = new MenuController();
