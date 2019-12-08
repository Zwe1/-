/**
 * 对象扁平化
 * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null,
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  }
 */

fla = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  d: { e: 2, f: 3 },
  g: null
};

function flatten(input, key) {
  let res = {};
  /* 代码实现 */
  for (let i in input) {
    const isArray = input instanceof Array;
    if (typeof input[i] !== "object") {
      if (!input[i]) {
        continue;
      } else if (isArray) {
        res[key ? `${key}[${i}]` : i] = input[i];
      } else {
        res[key ? `${key}.${i}` : i] = input[i];
      }
    } else {
      if (!input[i]) {
        continue;
      }
      res = {
        ...res,
        ...flatten(
          input[i],
          key ? (isArray ? `${key}[${i}]` : `${key}.${i}`) : i
        )
      };
    }
  }

  return res;
}

console.log(flatten(fla));
