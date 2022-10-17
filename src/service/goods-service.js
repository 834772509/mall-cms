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

  // 每个分类商品的个数
  async getCategoryCount() {
    const statement = `SELECT category.id,category.name,count(*) goodsCount FROM category RIGHT JOIN goods ON category.id = goods.categoryId group by categoryId`;
    const result = await connection.execute(statement, []);
    return result;
  }
  // 每个分类商品的销量
  async getCategorySale() {
    const statement = `SELECT category.id,category.name,sum(goods.saleCount) goodsCount FROM category RIGHT JOIN goods ON category.id = goods.categoryId group by categoryId`;
    const result = await connection.execute(statement, []);
    return result;
  }
  // 每个分类商品的收藏
  async getCategoryFavor() {
    const statement = `SELECT category.id,category.name,sum(goods.favorCount) goodsFavor FROM category RIGHT JOIN goods ON category.id = goods.categoryId group by categoryId`;
    const result = await connection.execute(statement, []);
    return result;
  }
  // 销量前10的商品数量
  async getSaleTopTen() {
    const statement = `SELECT id,name,saleCount FROM goods ORDER BY saleCount desc limit 10`;
    const result = await connection.execute(statement, []);
    return result;
  }
  // 不同城市的销量数据
  async getAddresSale() {
    const statement = `SELECT address,sum(saleCount) count FROM goods GROUP BY address`;
    const result = await connection.execute(statement, []);
    return result;
  }
  // 商品数据统计的数量
  async getAmountList() {
    const saleCountStatement = `SELECT sum(saleCount) count FROM goods`;
    const saleCountResult = await connection.execute(saleCountStatement, []);

    const favorCountStatement = `SELECT sum(favorCount) count FROM goods`;
    const favorCountResult = await connection.execute(favorCountStatement, []);

    const inventoryCountStatement = `SELECT sum(inventoryCount) count FROM goods`;
    const inventoryCountResult = await connection.execute(
      inventoryCountStatement,
      []
    );

    // const saleroomCountStatement = `SELECT sum(saleroomCount) count FROM goods`;
    // const saleroomCountResult = await connection.execute(
    //   saleroomCountStatement,
    //   []
    // );

    const result = [
      {
        amount: "sale",
        title: "商品总销量",
        tips: "所有商品的总销量",
        subtitle: "商品总销量",
        number1: Number(saleCountResult[0][0]["count"]),
        number2: Number(saleCountResult[0][0]["count"]),
      },
      {
        amount: "favor",
        title: "商品总收藏",
        tips: "所有商品的总收藏",
        subtitle: "商品总收藏",
        number1: Number(favorCountResult[0][0]["count"]),
        number2: Number(favorCountResult[0][0]["count"]),
      },
      {
        amount: "inventory",
        title: "商品总库存",
        tips: "所有商品的总库存",
        subtitle: "商品总库存",
        number1: Number(inventoryCountResult[0][0]["count"]),
        number2: Number(inventoryCountResult[0][0]["count"]),
      },
      {
        amount: "saleroom",
        title: "商品总销售额",
        tips: "所有商品的总销售额",
        subtitle: "商品总销售额",
        number1: 43118530,
        number2: 43118530,
      },
    ];

    return result;
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
