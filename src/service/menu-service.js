const connection = require("../app/database");

class menuService {
  /**
   * 创建菜单
   * @param {Object} menu
   * @returns
   */
  async create(menu) {
    const statement = `INSERT INTO menu(name,type,url,icon,sort,parentId,permission) VALUES (?,?,?,?,?,?,?);`;
    const rusult = await connection.execute(statement, [
      menu.name,
      menu.type,
      menu.url,
      menu.icon ?? null,
      menu.sort,
      menu.parentId,
      menu.permission ?? null,
    ]);
    return rusult[0];
  }

  /**
   * 获取菜单信息-通过ID
   */
  async getmenuById(id) {
    const statement = `SELECT * FROM menu WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  /**
   * 获取菜单列表
   */
  async list() {
    const statement = `SELECT * FROM menu`;
    const result = await connection.execute(statement, []);

    const getTreeList = (treeData, id, list) => {
      for (const item of treeData) {
        if (item.parentId === id) {
          list.push(item);
        }
      }
      createChildren(treeData, list);
      return list;
    };
    const createChildren = (treeData, list) => {
      for (const i of list) {
        i.children = [];
        getTreeList(treeData, i.id, i.children);
        if (i.children.length === 0) {
          delete i.children;
        }
      }
    };
    const res = getTreeList(result[0], 0, []);
    return [res];
  }

  /**
   * 更新菜单信息
   */
  async update(menuId, menu) {
    const data = [
      "name",
      "type",
      "url",
      "icon",
      "sort",
      "parentId",
      "permission",
    ];
    let fields = "";
    let param = [];
    for (const item of data) {
      if (menu[item]) {
        fields += `${fields == "" ? "" : ", "}${item}=?`;
        param.push(menu[item]);
      }
    }
    const statement = `UPDATE menu SET ${fields} WHERE id=?`;
    const result = await connection.execute(statement, [...param, menuId]);
    return result[0];
  }

  /**
   * 删除菜单
   */
  async remove(id) {
    const statement = `DELETE FROM menu WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new menuService();
