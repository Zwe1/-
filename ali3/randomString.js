/**
 * 说明：生成一个指定长度（默认6位）的随机字符，随机字符包含小写字母和数字。
 * 输入：输入随机字符长度，无输入默认6位
 * 输出：随机字符，如"6bij0v"
 */

function idGenerator(length = 6) {
  // 思路
  // 1. 构建同等概率生成随机字符的工厂函数
  // 2. 根据限定长度，逐位生成随机字符

  /* 功能实现 */
  const returnRandomStr = Math.random() > 0.5; // 相同概率产生一位字母或数字
  const charcodeOfA = 97; // a的字符码
  const rangeOfString = 26; // a-z的字符码极差
  const rangeOfNumber = 9; // 0 - 9 的极差

  let i = 0;
  let str = ""; // 输出字符串

  const getRandom = () =>
    returnRandomStr
      ? String.fromCharCode(
          charcodeOfA + Math.floor(Math.random() * rangeOfString)
        )
      : Math.floor(Math.random() * rangeOfNumber);

  while (i < length) {
    str += getRandom();
    i += 1;
  }

  return str;
}
