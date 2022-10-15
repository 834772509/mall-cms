const service = require("../service/label-service");

// 验证标签是否存在于数据库中
const verifyLabelsExists = async (ctx, next) => {
  // 取出要增加的所有标签
  const { labels } = ctx.request.body;

  // 判断每一个标签在label表中是否存在
  const newLabels = [];
  for (let item of labels) {
    const labelResult = await service.getLabelByName(item);

    const label = { item: item };
    if (!labelResult) {
      // 创建标签
      const result = await service.create(item);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }

  ctx.labels = newLabels;

  await next();
};

module.exports = {
  verifyLabelsExists,
};
