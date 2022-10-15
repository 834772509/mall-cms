const connection = require("../app/database");

class categoryService {
  /**
   * 创建类别
   * @param {Object} category
   * @returns
   */
  async create(category) {
    const { name } = category;
    const statement = `INSERT INTO category(name) VALUES (?);`;
    const rusult = await connection.execute(statement, [name]);
    return rusult[0];
  }

  /**
   * 获取类别列表
   */
  async list(name = "", offset = 0, size = 10) {
    const statement = `SELECT SQL_CALC_FOUND_ROWS * FROM category WHERE name LIKE ? LIMIT ?,?`;
    const result = await connection.execute(statement, [
      `%${name}%`,
      offset,
      size,
    ]);
    const totalCount = await connection.execute("SELECT FOUND_ROWS()", []);
    return [result[0], totalCount[0][0]["FOUND_ROWS()"]];
  }

  /**
   * 获取类别信息-通过ID
   */
  async getcategoryById(id) {
    const statement = `SELECT * FROM category WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  /**
   * 更新类别信息
   */
  async update(categoryId, name) {
    const statement = `UPDATE category SET name=? WHERE id=?`;
    const result = await connection.execute(statement, [name, categoryId]);
    return result[0];
  }

  /**
   * 删除类别
   */
  async remove(id) {
    const statement = `DELETE FROM category WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new categoryService();
