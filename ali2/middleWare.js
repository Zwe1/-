// 1. 实现一个Redux异步请求中间件，mock一个3秒的异步操作。(25分钟)

const sleep = (action, time = 3000) => {
  if (!action instanceof Function) {
    return;
  }

  const s = setTimeout(() => {
    action();
    clearTimeOut(s);
  }, time);
};

const thunk = (dispatch, getAllState) => nextMove => currActions => {
  if (currActions instanceof Function) {
    return new Promise(resolve => {
      sleep(() => {
        resolve(currActions(dispatch, getAllState));
      });
    });
  }

  return nextMove(currActions);
};
