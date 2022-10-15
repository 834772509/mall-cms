const connection = require("../app/database");

class DepartmentService {
  /**
   * 创建部门
   * @param {Object} department
   * @returns
   */
  async create(department) {
    const { name, parentId, leader } = department;
    const statement = `INSERT INTO department(name,parentId,leader) VALUES (?,?,?);`;
    const rusult = await connection.execute(statement, [
      name,
      parentId,
      leader,
    ]);
    return rusult[0];
  }

  /**
   * 获取部门列表
   */
  async getDepartmentList(name = "", leader = "", offset = 0, size = 10) {
    const statement = `SELECT SQL_CALC_FOUND_ROWS * FROM department WHERE name LIKE ? AND leader LIKE ? LIMIT ?,?`;
    const result = await connection.execute(statement, [
      `%${name}%`,
      `%${leader}%`,
      offset,
      size,
    ]);
    const totalCount = await connection.execute("SELECT FOUND_ROWS()", []);
    return [result[0], totalCount[0][0]["FOUND_ROWS()"]];
  }

  /**
   * 获取部门信息-通过ID
   */
  async getDepartmentById(id) {
    const statement = `SELECT * FROM department WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  /**
   * 更新部门信息
   */
  async update(departmentId, leader, parentId) {
    const statement = `UPDATE department SET leader=?,parentId=? WHERE id=?`;
    const result = await connection.execute(statement, [
      leader,
      parentId,
      departmentId,
    ]);
    return result[0];
  }

  /**
   * 删除部门
   */
  async remove(id) {
    const statement = `DELETE FROM department WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new DepartmentService();
