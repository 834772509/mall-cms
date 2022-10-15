const connection = require("../app/database");
const { APP_HOST, APP_PORT } = require("../app/config");

class MomentService {
  // 增加动态信息
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }

  // 查询动态信息-通过id
  async getMomentById(id) {
    const statement = `
      SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name,'avatarUrl',u.avatar_url) users,
      (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images',file.filename)) FROM file WHERE m.id = file.moment_id) images
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ?;
    `;
    const [result] = await connection.execute(statement, [id]);
    return result[0];
  }
  // 查询多条数据
  async getMomentList(offset, size) {
    const statement = `
    SELECT 
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name,'avatarUrl',u.avatar_url) users,
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
    (SELECT COUNT(*) FROM moment_label WHERE moment_label.moment_id = m.id) labelCount,
    (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images',file.filename)) FROM file WHERE m.id = file.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?,?;
  `;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  // 修改动态
  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }

  // 删除动态
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

  // 判断动态是否有标签
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }

  // 给动态增加标签
  async addLabels(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
