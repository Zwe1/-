/**
 * 题目：
 * 编写一个函数parseString，它的用途式把url参数转换为对象。
 * 如 www.baidu.com？a=1&b=2&c=www 转换为 {a:1,b:2,c:22}
 */

function parseString(url) {
  const [domain, params] = url.split("?");
  const result = {};
  if (params) {
    const pairs = params.split("&");
    pairs.forEach(content => {
      const [key, value] = content.split("=");
      result[key] = value;
    });
  }
  return result;
}

const url = "www.baidu.com?a=1&b=2&c=www";

console.log("parseString", parseString(url));
