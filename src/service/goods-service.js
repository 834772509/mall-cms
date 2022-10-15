const connection = require("../app/database");

class GoodsService {
  /**
   * 创建商品
   * @param {Object} goods
   * @returns
   */
  async create(goods) {
    const statement =
      "INSERT INTO goods (`name`, `oldPrice`, `newPrice`, `desc`, `status`, `imgUrl`, `inventoryCount`, `saleCount`, `favorCount`, `address`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const rusult = await connection.execute(statement, [
      goods.name,
      goods.oldPrice,
      goods.newPrice,
      goods.desc,
      goods.status,
      goods.imgUrl,
      goods.inventoryCount,
      goods.saleCount,
      goods.favorCount,
      goods.address,
    ]);
    return rusult[0];
  }

  /**
   * 获取商品信息-通过ID
   */
  async getGoodsById(id) {
    const statement = `SELECT * FROM goods WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }

  /**
   * 获取商品列表
   */
  async list(name = "", address = "", status = 1, offset = 0, size = 10) {
    const statement = `SELECT SQL_CALC_FOUND_ROWS * FROM goods WHERE name LIKE ? AND address LIKE ? AND status = ? LIMIT ?,?`;
    const result = await connection.execute(statement, [
      `%${name}%`,
      `%${address}%`,
      status,
      offset,
      size,
    ]);
    const totalCount = await connection.execute("SELECT FOUND_ROWS()", []);
    return [result[0], totalCount[0][0]["FOUND_ROWS()"]];
  }

  /**
   * 更新商品信息
   */
  async update(goodsId, goods) {
    const data = [
      "name",
      "oldPrice",
      "newPrice",
      "desc",
      "status",
      "imgUrl",
      "inventoryCount",
      "saleCount",
      "favorCount",
      "address",
    ];
    let fields = "";
    let param = [];
    for (let item of data) {
      if (goods[item]) {
        fields += `${fields == "" ? "" : ", "}${item}=?`;
        param.push(goods[item]);
      }
    }
    const statement = `UPDATE goods SET ${fields} WHERE id=?`;
    const result = await connection.execute(statement, [...param, goodsId]);
    return result[0];
  }

  /**
   * 删除商品
   */
  async remove(id) {
    const statement = `DELETE FROM goods WHERE id = ?`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
}

module.exports = new GoodsService();
