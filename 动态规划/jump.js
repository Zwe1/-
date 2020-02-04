// 一个机器人位于一个m x n网格的左上角 （起始点在下图中标记为“Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

/**
 *
 * @param {行} m
 * @param {列} n
 */
function jump(arr, m = arr.length - 1, n = arr[0].length - 1) {
  // 边界条件1:
  // 如果起始位置或结束位置有障碍，将无法到达组合为0
  if (arr[m][n] === 1 || arr[0][0] === 1) {
    return 0;
  }
  // 如果路径中有障碍
  if (m === 0 || n === 0) {
    if (m === 0) {
      return arr[0].includes(1) ? 0 : 1;
    } else {
      return arr.some(item => item[0] === 1) ? 0 : 1;
    }
  }
  return jump(arr, m - 1, n) + jump(arr, m, n - 1);
}

const arr = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

console.log(jump(arr));
