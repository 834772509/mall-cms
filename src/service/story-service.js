const connection = require("../app/database");

class storyService {
  /**
   * 创建故事
   * @param {Object} story
   * @returns
   */
  async create(story) {
    const { title, content } = story;
    const statement = `INSERT INTO story(title,content) VALUES (?,?);`;
    const rusult = await connection.execute(statement, [title, content]);
    return rusult[0];
  }

  /**
   * 获取故事列表
   */
  async list(offset = 0, size = 10) {
    console.log(offset, size);
    const statement = `SELECT SQL_CALC_FOUND_ROWS * FROM story LIMIT ?,?`;
    const result = await connection.execute(statement, [offset, size]);
    const totalCount = await connection.execute("SELECT FOUND_ROWS()", []);
    return [result[0], totalCount[0][0]["FOUND_ROWS()"]];
  }

  /**
   * 获取故事信息-通过ID
   */
  async getStoryById(id) {
    const statement = `SELECT * FROM story WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  /**
   * 更新故事信息
   */
  async update(storyId, story) {
    const data = ["title", "content"];
    let fields = "";
    let param = [];
    for (const item of data) {
      if (story[item]) {
        fields += `${fields == "" ? "" : ", "}${item}=?`;
        param.push(story[item]);
      }
    }
    const statement = `UPDATE story SET ${fields} WHERE id=?`;
    const result = await connection.execute(statement, [storyId]);
    return result[0];
  }

  /**
   * 删除故事
   */
  async remove(id) {
    const statement = `DELETE FROM story WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new storyService();
