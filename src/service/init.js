const { MYSQL_DATABASE } = require("../app/config");

// 初始化数据库
async function initDatabase(connection) {
  const statement = "CREATE DATABASE IF NOT EXISTS `?`";
  await connection.execute(statement, [MYSQL_DATABASE]);
}

module.exports = initDatabase;
