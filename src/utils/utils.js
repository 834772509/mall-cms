/**
 * 获取菜单列表树
 */
const getMenuTreeList = (treeData, id, list) => {
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
    getMenuTreeList(treeData, i.id, i.children);
    if (i.children.length === 0) {
      delete i.children;
    }
  }
};

module.exports = { getMenuTreeList };
