const connection = require("../app/database");

// 权限验证
class AuthService {
  /**
   * 验证权限
   * @param {String} tableName 表名
   * @param {Number} id id
   * @param {Nubmer} userId 用户id
   * @return {Boolean} 是否具有权限
   */
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`;
    const [result] = await connection.execute(statement, [id, userId]);
    return result.length === 0 ? false : true;
  }
}

module.exports = new AuthService();
