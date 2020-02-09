// 制作多米诺骨牌。

// 计算一种排序给定多米诺骨牌的方法，以使它们形成正确的多米诺骨牌链（一块石头的一半上的点与相邻一块石头的相邻一半上的点匹配），并且该部分的一半上 没有邻居的石头（第一块和最后一块）相互匹配。

// 例如，给定宝石21、23和13，您应该计算出12 23 31或32 21 13或13 32 21等，其中第一个和最后一个数字相同。

// 对于宝石12、41和23，所得的链无效：41 12 23的第一个和最后一个数字不相同。 4！= 3

// 假设正在使用多个Domino集，则某些测试用例可能在链式解决方案中使用重复的石头。

// 输入示例：（1、2），（5、3），（3、1），（1、2），（2、4），（1、6），（2、3），（3、4） ，（5，6）

const input = [
  [1, 2],
  [5, 3],
  [3, 1],
  [1, 2],
  [2, 4],
  [1, 6],
  [2, 3],
  [3, 4],
  [5, 6]
];

/**
 * @param {输入的可分配列表} input
 * @param {上一个多米诺链} chain
 */
const chaos = (input, chain) => {
  if (input.length) {
    const length = chain.length;
    // 找到多米诺链的最左侧和最右侧
    const l = chain[0][0];
    const r = chain[length - 1][1];

    // 从列表中拿出新的左侧牌子
    const newLeftIndex = input.findIndex(value => value.includes(l));
    const newLeft = input.splice(newLeftIndex, 1)[0];

    // 从列表中拿出新的右侧牌子
    const newRightIndex = input.findIndex(value => value.includes(r));
    const newRight = input.splice(newRightIndex, 1)[0];

    // 进入下一个查找
    return chaos(input, [
      [newLeft.filter(v => v !== l)[0], l],
      ...chain,
      [r, newRight.filter(v => v !== r)[0]]
    ]);
  }

  return chain;
};

/**
 *
 * @param { *采用动态规划思路} input
 * 多米诺链是一个闭环
 *
 */
const connectDominoes = input => {
  // 以任意一项为开始
  const result = input.map((item, i) => {
    return chaos(
      input.filter((v, index) => index !== i),
      [item]
    );
  });

  // 结果返回了所有的开始结点，取任意一个结果皆可
  return result;
};

console.log(JSON.stringify(connectDominoes(input)));
