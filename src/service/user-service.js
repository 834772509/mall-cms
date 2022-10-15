const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;

    // 将user存储到数据库中
    const statement = `INSERT INTO users(name,password) VALUES (?,?);`;
    const rusult = await connection.execute(statement, [name, password]);
    return rusult[0];
  }

  /**
   * 获取所有用户列表
   */
  async getUserList() {
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
}

module.exports = new UserService();
