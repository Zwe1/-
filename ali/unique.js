/**
 * 题目:
 * 给Array对象增加一个原型方法，用于删除数组条目中重复的元素,
 * 比如给定数组【'1','2','1','3','2'】，执行方法后，原数组变为【'1', '2', '3'】, 返回【'1','2'】;
 */

Array.prototype.unique = function() {
  if (!Array.isArray(this) || this.length === 0) return this;
  let result = [];

  let i = 0;

  while (i <= this.length - 1) {
    if (this.indexOf(this[i]) !== i) {
      result.push(this[i]);
      this.splice(i, 1);
    } else {
      i++;
    }
  }

  return result;
};

a = [1, 2, 3, 1, 2, 3, 2, 5, 4];

console.log(a.unique(), a);
