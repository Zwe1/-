// 将输入的数组组装成一颗树状的数据结构，时间复杂度越小越好。要求程序具有侦测错误输入的能力。

const input = [
  { id: 1, name: "i1" },
  { id: 2, name: "i2", parentId: 1 },
  { id: 4, name: "i4", parentId: 3 },
  { id: 3, name: "i3", parentId: 2 },
  { id: 8, name: "i8", parentId: 7 }
];

const makeTree = (list, parentId) => {
  let tree = {};
  list.forEach(element => {
    if (element.parentId === parentId) {
      list.splice(i, 1);
      element.next = makeTree(list, element.id);
      tree = element;
    }
  });
  return tree;
};

const createTreefromflatdata = list => {
  // 不合法的输入,不存在parent node
  if (
    list.some(
      item =>
        item.parentId && list.findIndex(l => l.id === item.parentId) === -1
    )
  )
    return false;
  return makeTree(list);
};

createTreefromflatdata(input);
