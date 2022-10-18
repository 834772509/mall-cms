const connection = require("../app/database");
const departmentService = require("../service/department-service");
const roleService = require("../service/role-service");

class UserService {
  async create(user) {
    const { name, realname, password, cellphone, departmentId, roleId } = user;

    // 将user存储到数据库中
    const statement = `INSERT INTO users(name, realname, password, cellphone, departmentId, roleId) VALUES (?, ?, ?, ?, ?, ?)`;
    const rusult = await connection.execute(statement, [
      name,
      realname,
      password,
      cellphone,
      departmentId,
      roleId,
    ]);
    return rusult[0];
  }

  /**
   * 获取所有用户列表
   */
  async list() {
    const statement = `SELECT * FROM users`;
    const result = await connection.execute(statement, []);
    return result[0];
  }

  /**
   * 获取用户-通过用户名
   * @param {String} name 用户名
   */
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  /**
   * 获取用户-通过用户ID
   * @param {String} id 用户ID
   */
  async getUserByID(id) {
    const statement = `SELECT * FROM users WHERE id = ?`;
    const result = await connection.execute(statement, [id]);

    for (let index = 0; index < result[0].length; index++) {
      const user = result[0][index];
      const { departmentId, roleId } = user;
      const departmentResult = await departmentService.getDepartmentById(
        departmentId
      );
      const roleResult = await roleService.getRoleById(roleId);
      result[0][index]["department"] = departmentResult[0];
      result[0][index]["role"] = roleResult[0];
    }
    return result[0];
  }

  /**
   * 更新用户头像-根据用户Id
   * @param {Number} id 用户Id
   * @param {String} avatarURL 用户头像URL
   */
  async updateAvatarUrlById(id, avatarURL) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [avatarURL, id]);
    return result;
  }

  /**
   * 删除用户
   */
  async remove(userId) {
    const statement = `DELETE FROM users WHERE id = ?`;
    const result = await connection.execute(statement, [userId]);
    return result[0];
  }
}

module.exports = new UserService();
