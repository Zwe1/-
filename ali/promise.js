/**
 * 题目：
 * 使用ES6的Promise优化下面代码:
 * var fs = require("fs");
 * fs.readFile('sample01.txt', 'utf8', function() {
 *  fs.readFile('sample02.txt', 'utf8', function() {
 *     fs.readFile('sample03.txt', 'utf8', function(){
 *    })
 *  })
 * })
 */

const fs = require("fs");

const readFile = new Promise(resolve => {
  fs.readFile("./flatten.js", "utf8", function() {
    resolve("sample01");
  });
})
  .then(res1 => {
    console.log(res1);
    return new Promise(resolve => {
      fs.readFile("./unique.js", "utf8", function() {
        resolve("sample02");
      });
    });
  })
  .then(res2 => {
    console.log(res2);
    return new Promise(resolve => {
      fs.readFile("./flatten.js", "utf8", function() {
        resolve("sample03");
      });
    });
  })
  .then(res3 => {
    console.log(res3);
  });

console.log(readFile);
