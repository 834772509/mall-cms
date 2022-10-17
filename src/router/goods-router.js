const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth-middleware");
const {
  create,
  list,
  detail,
  categoryCount,
  categorySale,
  saleTopTen,
  addresSale,
  amountList,
  update,
  remove,
  categoryFavor,
} = require("../controller/goods-controller");

const goodsRouter = new Router({ prefix: "/goods" });

// 创建类别
goodsRouter.post("/", verifyAuth, create);
// 获取类别列表
goodsRouter.post("/list", verifyAuth, list);

// 获取某个类别信息
goodsRouter.get("/:goodsId", verifyAuth, detail);
// 每个分类商品的个数
goodsRouter.get("/category/count", verifyAuth, categoryCount);
// 每个分类商品的销量
goodsRouter.get("/category/sale", verifyAuth, categorySale);
// 每个分类商品的收藏
goodsRouter.get("/category/favor", verifyAuth, categoryFavor);
// 销量前10的商品数量
goodsRouter.get("/sale/top10", verifyAuth, saleTopTen);
// 不同城市的销量数据
goodsRouter.get("/address/sale", verifyAuth, addresSale);
// 商品数据统计的数量
goodsRouter.get("/amount/list", verifyAuth, amountList);

// 更新类别信息
goodsRouter.patch("/:goodsId", verifyAuth, update);
// 删除类别
goodsRouter.delete("/:goodsId", verifyAuth, remove);

module.exports = goodsRouter;
