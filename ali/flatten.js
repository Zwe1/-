/**
 * 题目：
 * 编写一个函数flatten，传入仅包含数字的多维数组，返回展开的一维数组;
 */

function flatten(arr) {
  return arr.reduce(
    (res, curr) => res.concat(Array.isArray(curr) ? flatten(curr) : [curr]),
    []
  );
}

const arr1 = [1, 2, [2, 3, [4, 5, 7], 2], 7];

console.log(flatten(arr1));
