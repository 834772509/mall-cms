// 标签接口
const connection = require("../app/database");

class LabelService {
  // 创建标签
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  // 查询标签-通过名称
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
  // 查询所有标签
  async getLabels(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ?,?;`;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
}

module.exports = new LabelService();
