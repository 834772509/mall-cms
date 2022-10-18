const roleService = require("../service/role-service");
const menuService = require("../service/menu-service");
const { getMenuTreeList } = require("../utils/utils");

// 角色模块
class RoleController {
  // 创建角色
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const role = ctx.request.body;

    // 增加数据
    const result = await roleService.create(role);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "增加角色成功~" : "增加角色失败~",
    };
  }

  // 查询角色列表
  async list(ctx, next) {
    // 获取数据
    const { name, intro, offset, size } = ctx.request.body;
    const [result, totalCount] = await roleService.list(
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

  // 获取某个角色信息
  async detail(ctx, next) {
    const { roleId } = ctx.params;
    const result = await roleService.getRoleById(roleId);
    ctx.body = { code: 0, data: result[0] };
  }

  // 查询角色菜单树
  async menu(ctx, next) {
    const { roleId } = ctx.params;
    const result = await roleService.getRoleById(roleId);

    const menuInfoList = [];
    // 获取角色菜单列表
    const menuIdList = JSON.parse(result[0]["menuList"]);
    for (const id of menuIdList) {
      const menuInfo = await menuService.getMenuById(id);
      menuInfoList.push(menuInfo[0]);
    }
    ctx.body = { code: 0, data: getMenuTreeList(menuInfoList) };
  }

  // 查询角色菜单ids
  async menuIds(ctx, next) {
    const { roleId } = ctx.params;
    const result = await roleService.getRoleById(roleId);
    ctx.body = { code: 0, data: result[0] };
  }

  // 编辑角色信息
  async update(ctx, next) {
    const { roleId } = ctx.params;
    const role = ctx.request.body;
    const result = await roleService.update(roleId, role);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "编辑角色成功~" : "编辑角色失败~",
    };
  }

  // 删除角色
  async remove(ctx, next) {
    const { roleId } = ctx.params;
    const result = await roleService.remove(roleId);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "删除角色成功~" : "删除角色失败~",
    };
  }
}

module.exports = new RoleController();
