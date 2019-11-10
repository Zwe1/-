// 请在 1 个小时内完成以下笔试题

// 1、给Array对象增加一个原型方法，用于删除数组条目中重复的条目(可能有多个)，返回值是一个包含被删除的重复条目的新数组。
// 比如 给定数组 ['1', '2', '1', '3', '2'] ，执行方法后，数组项变为 ['1', '2', '3'] ，返回 ['1', '2']

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

// 2、写个转换函数，把一个 JSON 对象的 key 从横杠形式（Pascal）转换到小驼峰形式（Camel）。即 {"a_b": 1} ——> {"aB": 1}。

function parse(v) {
  if (typeof v === "string") {
    return v.replace(/\_\w/g, v => v.replace(/_/, "").toUpperCase());
  }
  return v;
}

// 主函数
function main(obj) {
  if (
    typeof obj === "object" &&
    !(obj instanceof Function) &&
    !(obj instanceof Array) &&
    obj !== null
  ) {
    const res = {};

    Object.keys(obj).forEach(k => {
      res[parse(k)] = obj[k];
    });

    return res;
  }

  return obj;
}

// 3、写一个函数实现数字格式化输出，比如输入 999999999，输出为 999,999,999。

function parseBigNumber(num) {
  if (typeof num !== "number") return num;

  let strArr = [];

  num
    .toString()
    .split("")
    .reverse()
    .forEach((v, i) => {
      if (i && i % 3 === 0) {
        strArr.push(",");
      }
      strArr.push(v);
    });

  return strArr.reverse().join("");
}

// 4、编写一个函数 parseQueryString，它的用途是把 URL 参数解析为一个对象。

function parseQueryString(url) {
  const [domain, params] = url.split("?");
  const result = {};

  if (params) {
    const pairs = params.split("&");

    pairs.forEach(content => {
      const [key, value] = content.split("=");
      result[key] = decodeURI(value);
    });
  }

  return result;
}

// 5、编写一个函数 flatten ，传入仅包含数字的多维数组，返回拍平后的结果。如：传入 [1, [2, 3, [4]]] 返回 [1, 2, 3, 4]。

// 解决方案1
function flatten1(arr) {
  return arr.reduce(
    (res, curr) => res.concat(Array.isArray(curr) ? flatten(curr) : [curr]),
    []
  );
}

// 解决方案2:
function flatten2(arr) {
  const len = arr.length;

  if (!len) return [];

  let result = [];
  let i = 0;

  while (i < len) {
    if (Array.isArray(arr[i])) {
      result = [...result, ...flatten(arr[i])];
    } else {
      result = [...result, arr[i]];
    }
    i++;
  }

  return result;
}

// 6、写一个类 EventEmitter，实现简单的发布订阅功能：

const e = new EventEmitter();

e.on("update", function(data) {
  console.log(data);
});

e.emit("update", "message");

class EventEmitter {
  constructor() {
    // { [e]： Array<callback: fuc>}
    this.events = {};
  }

  // 订阅
  on(e, callback) {
    if (!this[e]) {
      this[e] = [];
    }
    this[e].push(callback);
    return this.events.length - 1;
  }

  // 解除订阅
  off(e, callback) {
    if (this[e]) {
      const index = this[e].indexOf(callback);
      this[e].splice(index, 1);
    }
  }

  // 发布
  emit(e, data) {
    if (this[e] && this[e].length >= 0) {
      this[e].forEach(callback => callback(data));
    }
  }
}

// 7、使用ES6的Promise对象优化下面代码：

var fs = require("fs");

fs.readFile("sample01.txt", "utf8", function(err, data) {
  fs.readFile("sample02.txt", "utf8", function(err, data) {
    fs.readFile("sample03.txt", "utf8", function(err, data) {});
  });
});

// 解决方案1:

const fs = require("fs");

const readFile = new Promise((resolve, reject) => {
  fs.readFile("sample01.txt", "utf8", function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
})
  .then(res1 => {
    console.log(res1);
    return new Promise((resolve, reject) => {
      fs.readFile("sample02.txt", "utf8", function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  })
  .then(res2 => {
    console.log(res2);
    return new Promise((resolve, reject) => {
      fs.readFile("sample03.txt", "utf8", function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  })
  .then(res3 => {
    console.log(res3);
  });

// 解决方案2:

const readSingleFile = (file = "", standard = "utf8") => {
  if (!file) return Promise.reject(new Error("no file"));

  return new Promise((resolve, reject) => {
    fs.readFile(file, standard, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

async function main() {
  try {
    const res1 = await readSingleFile("sample01.txt");
    console.log("res1", res1);
    const res2 = await readSingleFile("sample02.txt");
    console.log("res2", res2);
    const res3 = await readSingleFile("sample03.txt");
    console.log("res3", res3);
  } catch (err) {
    console.log("err", err);
  }
}

// 8、实现两个超大数相乘（超大数指超过语言支持的数字的最大表示范围)

function multiply(a, b) {
  const _a = a.split("").reverse();
  const _b = b.split("").reverse();
  let total = [];

  for (let i = 0; i < _a.length; i++) {
    for (let j = 0; j < _b.length; j++) {
      let [t, n] = String(Number(_b[j]) * Number(_a[i])).split("");
      t = Number(t);
      n = Number(n);

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
