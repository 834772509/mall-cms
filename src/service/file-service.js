const connection = require("../app/database");

class FileService {
  // 增加用户图像的信息
  async createAvatar(fileName, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
    const result = await connection.execute(statement, [fileName, mimetype, size, userId]);
    return result;
  }

  // 查询用户图像-根据Id
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[0];
  }

  // 增加文件信息
  async createFile(fileName, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id,moment_id) VALUES (?, ?, ?, ?, ?);`;
    const result = await connection.execute(statement, [
      fileName,
      mimetype,
      size,
      userId,
      momentId,
    ]);
    return result;
  }

  // 查询文件-根据文件名
  async getFileByFileName(fileName) {
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [fileName]);
    return result[0];
  }
}

module.exports = new FileService();
