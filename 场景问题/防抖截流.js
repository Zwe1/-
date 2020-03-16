/**
 * 防抖: n 秒内连续触发事件，只执行一次
 */

const debounce = (action, time) => {
  let currentT;
  return (...arg) => {
    if (currentT) {
      clearTimeout(currentT);
    }
    currentT = setTimeout(() => {
      action(arg);
    }, time);
  };
};

/**
 * useage
 */
let i = 0;

let func = () => {
  console.log(i++);
};

func = debounce(func, 3000);

new Array(10).fill(1).forEach(() => {
  func();
});

/**
 * 截流: 以固定频率执行事务
 */

const throttle = (action, time) => {
  let t = 0;
  return (...arg) => {
    let now = Date.now();
    if (now - t > time) {
      action(arg);
      t = now;
    }
  };
};
