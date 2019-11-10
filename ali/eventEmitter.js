/**
 * 题目:
 * 写一个类EventEmitter，实现简单的发布订阅功能
 * const e = new EventEmitter();
 * e.on('update', function(data) {console.log(data)})
 * e.emit('update', 'message');
 */

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

const e = new EventEmitter();
e.on("update", function(data) {
  console.log(data);
});
e.emit("update", "message");
