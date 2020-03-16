// 问题：
// 要求并发数量限制在n,进行request

/**
 *
 * 并发请求
 * @param {请求列表}} requests
 * @param {并发限制数量} limitedNumber
 */
class BatchRequest {
  constructor(requests, limitedNumber) {
    this.limitedNumber = limitedNumber;
    this.count = 0;
    this.queue = requests;

    this.do = this.do.bind(this);
    this.call = this.call.bind(this);
  }

  do(callback) {
    this.count = this.limitedNumber;
    const beginQueue = this.queue.splice(0, this.limitedNumber);
    beginQueue.forEach(request => {
      this.call(request, callback);
    });
  }

  call(request, callback) {
    this.count++;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        request(content =>
          setTimeout(() => {
            resolve(content);
          }, 3000)
        );
      });
    })
      .then(res => {
        callback(undefined, res);
      })
      .catch(error => {
        callback(error, undefined);
      })
      .finally(() => {
        this.count--;
        if (this.queue.length) {
          const next = this.queue.shift();
          this.call(next, callback);
        }
      });
  }
}

/**
 * 实例化
 */

const requests = new Array(23).fill(1).map((v, i) => promise => promise(i));

const promisesQueue = new BatchRequest(requests, 5);

promisesQueue.do((error, result) => {
  console.log(result);
});
