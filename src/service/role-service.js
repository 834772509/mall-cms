const connection = require("../app/database");

class RoleService {
  /**
   * 创建角色
   * @param {Object} role
   * @returns
   */
  async create(role) {
    const { name, intro, menuList } = role;
    const statement = `INSERT INTO role(name,intro,menuList) VALUES (?,?,?);`;
    const rusult = await connection.execute(statement, [name, intro, menuList]);
    return rusult[0];
  }

  /**
   * 获取角色信息-通过ID
   */
  async getRoleById(id) {
    const statement = `SELECT * FROM role WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  /**
   * 获取角色列表
   */
  async list(name = "", intro = "", offset = 0, size = 10) {
    const statement = `SELECT SQL_CALC_FOUND_ROWS * FROM role WHERE name LIKE ? AND intro LIKE ? LIMIT ?,?`;
    const result = await connection.execute(statement, [
      `%${name}%`,
      `%${intro}%`,
      offset,
      size,
    ]);
    const totalCount = await connection.execute("SELECT FOUND_ROWS()", []);

    // 获取角色菜单列表
    const menuListstatement = `SELECT * FROM menu`;
    const menuListresult = await connection.execute(menuListstatement, []);
    for (let i = 0; i < result[0].length; i++) {
      const item = result[0][i];
      // 查询角色的菜单列表
      let menuList = JSON.parse(item.menuList);
      menuList = menuListresult[0].filter((menu) => {
        return menuList.indexOf(menu.id) !== -1;
      });
      result[0][i]["menuList"] = menuList;
    }

    return [result[0], totalCount[0][0]["FOUND_ROWS()"]];
  }

  /**
   * 更新角色信息
   */
  async update(roleId, role) {
    const data = ["name", "intro", "menuList"];
    let fields = "";
    let param = [];
    for (const item of data) {
      if (role[item]) {
        fields += `${fields == "" ? "" : ", "}${item}=?`;
        param.push(role[item]);
      }
    }
    const statement = `UPDATE role SET ${fields} WHERE id=?`;
    const result = await connection.execute(statement, [...param, roleId]);
    return result[0];
  }

  /**
   * 删除角色
   */
  async remove(id) {
    const statement = `DELETE FROM role WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new RoleService();
