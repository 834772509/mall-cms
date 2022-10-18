/**
 * 将菜单列表转换为树结构列表
 * @param {Array} menuList 菜单列表
 * @returns
 */
const getMenuTreeList = (menuList) => {
  // 将全部的permissionId作为对象的key重组成一个对象
  let formatObj = menuList.reduce((pre, cur) => {
    return { ...pre, [cur["id"]]: cur };
  }, {});

  let formatArray = menuList.reduce((arr, cur) => {
    let parentId = cur.parentId ? cur.parentId : 0;
    let parent = formatObj[parentId];
    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur]);
    } else {
      arr.push(cur);
    }
    return arr;
  }, []);

  return formatArray;
};

module.exports = { getMenuTreeList };
