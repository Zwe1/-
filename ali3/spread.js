/**
 * 一行解构，获得d的值
 */

const input = {
  a: {
    b: {
      c: {
        d: 1
      }
    }
  }
};

const { a: { b: { c: { d: result } = {} } = {} } = {} } = input;

console.log(result);
