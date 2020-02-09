// 题目：
// 根据输入的数组中每项的 before/after/first/last 规则，
// 输出一个新排好序的数组或者链表。要求，多解的情况可以只求一解，如果无解要求程序能检测出来。

// Input:

const input = [
  { id: 1 },
  { id: 2, before: 1 },
  { id: 3, after: 1 },
  { id: 5, first: true },
  { id: 6, last: true },
  { id: 7, after: 8 },
  { id: 8 },
  { id: 9 }
];

const orderedLinkList = list => {
  let result = [];
  const needTobeSort = [];
  list.forEach(item => {
    if (item.before || item.after || item.first || item.last) {
      needTobeSort.push(item);
    } else {
      result.push(item);
    }
  });

  needTobeSort.forEach(o => {
    if (o.first) {
      result.unshift(o);
    } else if (o.last) {
      result.push(o);
    } else if (o.before) {
      const i = result.findIndex((x = {}) => x.id === o.before);
      if (i == -1) {
        // 不合法
        return false;
      } else if (i === 0) {
        result.unshift(o);
      } else {
        result.splice(i - 1, 0, o);
      }
    } else if (o.after) {
      const i = result.findIndex((x = {}) => x.id === o.after);
      if (i == -1) {
        // 不合法
        return false;
      } else {
        result.splice(i, 0, o);
      }
    }
  });

  return result;
};

console.log(orderedLinkList(input));
