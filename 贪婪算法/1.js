/**
 * 题目：
 * 硬币找零，给出可选面额和找零金额，给出最少硬币方案
 */

const input = [1, 2, 5, 10, 50].reverse();

const money = 38;

const getTheChanges = (choices, money) => {
  const result = [];
  let rest = money;
  while (rest) {
    const i = choices.findIndex(v => rest >= v);
    if (i > -1) {
      result.push(choices[i]);
      rest = rest - choices[i];
    } else {
      return false;
    }
  }
  return result;
};

console.log(getTheChanges(input, money));
