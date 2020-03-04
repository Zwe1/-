// 问题: s形打印二叉树

const tree = {
  value: 5,
  children: [
    {
      value: 4,
      children: [
        {
          value: 11,
          children: [
            {
              value: 7
            },
            {
              value: 2
            }
          ]
        }
      ]
    },
    {
      value: 8,
      children: [
        {
          value: 13,
          children: [
            {
              value: 1
            }
          ]
        },
        {
          value: 4
        }
      ]
    }
  ]
};

/**
 *
 * 思路：
 * 1. 广度优先遍历树
 * 2. 在遍历某一层级的时候，将下一级节点缓存至current
 * 3. 根据遍历方向，合理反转结点顺序
 */

const breadthFirst = tree => {
  let stop = false;
  let toRight = true;
  const result = [];
  const { value, children } = tree;
  if (!children) return value;
  result.push(value);
  // 存储下一个
  let current = children;

  while (!stop) {
    const length = current.length;
    if (length) {
      const c = toRight ? [...current] : [...current].reverse();
      current = [];
      c.forEach(child => {
        const { value, children } = child;
        result.push(value);
        if (children)
          current = current.concat(toRight ? children : children.reverse());
      });
      if (!toRight) current = current.reverse();
      toRight = !toRight;
    } else {
      stop = true;
    }
  }

  console.log(result);
};

breadthFirst(tree);
