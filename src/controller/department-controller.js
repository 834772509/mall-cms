const departmentService = require("../service/department-service");

// 部门模块
class DepartmentController {
  // 创建部门
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const department = ctx.request.body;

    // 增加数据
    const result = await departmentService.create(department);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "增加部门成功~" : "增加部门失败~",
    };
  }

  // 查询部门列表
  async list(ctx, next) {
    // 获取数据
    const { name, leader, offset, size } = ctx.request.body;
    const [result, totalCount] = await departmentService.getDepartmentList(
      name,
      leader,
      offset,
      size
    );
    ctx.body = {
      code: 0,
      data: { list: result, totalCount: totalCount },
    };
  }

  // 获取某个部门信息
  async detail(ctx, next) {
    const { departmentId } = ctx.params;
    const result = await departmentService.getDepartmentById(departmentId);
    ctx.body = { code: 0, data: result[0] };
  }

  // 编辑部门信息
  async update(ctx, next) {
    const { departmentId } = ctx.params;
    const { leader, parentId } = ctx.request.body;
    const result = await departmentService.update(
      departmentId,
      leader,
      parentId
    );
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "编辑部门成功~" : "编辑部门失败~",
    };
  }

  // 删除部门
  async remove(ctx, next) {
    const { departmentId } = ctx.params;
    const result = await departmentService.remove(departmentId);
    ctx.body = {
      code: 0,
      data: result.affectedRows != 0 ? "删除部门成功~" : "删除部门失败~",
    };
  }
}

module.exports = new DepartmentController();
