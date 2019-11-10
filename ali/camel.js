/**
 * 题目:
 * 写个转换函数，把一个JSON对象的key转换为驼峰表达式，
 * 输入'{ a_vb_c: 2, add_wq: 3}'， 调用方法后输出{ aVbC: 2, addWq: 3}
 */

function parse(v) {
  if (typeof v === "string") {
    return v.replace(/\_\w/g, v => v.replace(/_/, "").toUpperCase());
  }
  return v;
}

function camel(obj) {
  if (typeof obj === "object" && obj !== null) {
    const res = {};
    Object.keys(obj).forEach(k => {
      res[parse(k)] = obj[k];
    });
    return res;
  }

  return obj;
}

let o = { a_v_c: 2, _add_wq: 3, av_: 4 };
console.log(camel(o));
