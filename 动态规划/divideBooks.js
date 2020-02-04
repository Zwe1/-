// 题目：有一个只能容纳10本书的单层书架，
// 你每次只能放1本或2本书。
// 要求用程序求出你将书架填满一共有多少种方法。

function divideBooks(n) {
  if (n < 1) return 0;
  if (n <= 2) return n;
  return divideBooks(n - 1) + divideBooks(n - 2);
}

console.log(divideBooks(10));
