const crypto = require("crypto");

/**
 * MD5加密
 * @param {Number} password 密码
 */
const md5Password = (password) => {
  const md5 = crypto.createHash("md5");
  const result = md5.update(password).digest("hex");
  return result;
};

module.exports = md5Password;
