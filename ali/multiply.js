/**
 * 题目：
 * 实现两个超大数相乘
 */

function multiply(a, b) {
  const _a = a.split("").reverse();
  const _b = b.split("").reverse();
  let total = [];
  for (let i = 0; i < _a.length; i++) {
    for (let j = 0; j < _b.length; j++) {
      let [t, n] = String(Number(_b[j]) * Number(_a[i])).split("");
      t = Number(t);
      n = Number(n);
      //   const n = (Number(_b[j]) * Number(_a[i])) % 10;
      //   const t = Number(((Number(_b[j]) * Number(_a[i])) / 10).toFixed(0));
      //   total[i] = typeof total[i] === "number" ? total[i] + n : n;
      //   if (t) {
      //     total[i + 1] = typeof total[i + 1] === "number" ? total[i + 1] + t : t;
      //   }
      if (Number.isNaN(n)) {
        total[i + j] = typeof total[i + j] === "number" ? total[i + j] + t : t;
      } else {
        total[i + j] = typeof total[i + j] === "number" ? total[i + j] + n : n;
        total[i + j + 1] =
          typeof total[i + j + 1] === "number" ? total[i + j + 1] + t : t;
      }
    }
  }
  return total.reverse().join("");
}

const a = "59866878678768738736876685857";
const b = "989087078670607558555856564";

console.log(multiply(a, b));
