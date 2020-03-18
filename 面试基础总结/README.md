## 面试基础题

根据 2020 年前后，前端方向面试中对于基础知识的考察点，通过对以往所学内容和一些常用场景，作以下总结。

#### css

1. 如何实现双列布局？

```md
方案 1: absolute

左边列固定宽度，右边列通过**position : absolute**相对于父元素容器绝对定位，设置**padding: left** 等于左侧列宽度，自身宽度设置**100%**, **box-sizing: border-box**。

方案 2: flex

设置父元素**display: flex;**，子元素设置**flex: 0 0 200px; flex: 1 1 auto;**。

方案 3: calc()

设置两个子元素为**display: inline-block;**, 左侧元素固定宽度，右侧元素**width: calc(100% - 200px);**。

方案 4: grid

设置父元素属性**display: grid;grid-template-columns: 200px auto;**；
```

2. 居中的方案？

```md
垂直居中:

1. height = line-height。
2. position: absolute; top: calc(50% - height / 2);
3. display: flex; align-items: center;

水平居中:

1. text-align: center;
2. position: absolute; left: calc(50% - width / 2);
3. display: flex; justify-content: center;
```

#### js

1. generator 实现原理？

```js
// 实例
function* hellogenerator() {
  yield "hello";
  yield "world";
  return "ending";
}

const g = hellogenerator();
g.next(); // {value: "hello", done: false}
g.next(); // {value: "world", done: false}
g.next(); // {value: "ending", done: true}
g.next(); // {value: undefined, done: true}

// 思路
// 1. hellogenerator执行后返回一个对象。
// 2. 该对象的原型上具备next方法。
// 3. next 方法每次执行返回一个状态对象
// 4. 状态对象包含value和done属性。

// 简易实现
function generatorWrapper(fn) {
  const context = {
    next: 1
  };

  const result = {
    value: undefined,
    done: false
  };

  function runGenerator(context) {
    // runGenerator的switch content根据传入的fn实现
    // 这一部分需要babel参与进行转译
    switch (context.next) {
      case 1:
        result.value = "hello";
        context.next = 2;
        break;
      case 2:
        result.value = "word";
        context.next = 3;
        break;
      case 3:
        result.value = "ending";
        result.done = true;
        context.next = undefined;
        break;
      default:
        result.value = undefined;
        break;
    }
  }

  const generatorObject = {};

  generatorObject.__proto__ = {
    next() {
      runGenerator(context);
      return result;
    }
  };

  return generatorObject;
}
```

2. 实现一个 promise 请求，限制并发数量？

```js
//实例
const requests = new Array(23).fill(1).map((v, i) => promise => promise(i));

const promisesQueue = new BatchRequest(requests, 5);

promisesQueue.do((error, result) => {
  console.log(result);
});

// 思路
// 1. 将普通请求封装成promise。
// 2. promise发送过程中控制最大并发数量。
// 3. 当任意一个请求得到响应时，检查目前正在请求当中的数量是否达到最大数量限制。
// 4. 如果等于最大数量，则不做处理；如果小于最大数量，可以发送一个新的请求。
// 5. 提供可以传入回调处理结果的接口。

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
```

#### 框架原理(React)

1. setState 原理 ?

```md
**react 中 setState 在合成事件和生命周期中异步执行，在原生事件中同步执行。**

1. react 对 js 原生事件做了封装处理，如 **onClick, onChange** 等都是合成事件。
2. react 在生命周期中的 setState 以异步方式执行。
3. react 在 setTimeout, setInterval, promise 的 then 回调中以同步方式运行。

setState 执行顺序：

1. 将 new state 存放在 equeueState 当中
2. 异步场景中，先执行其他同步任务
3. 对 state 进行合并处理后更新状态
4. 如果 component 正在更新状态，将 component 标记为 dirty, 更新完之后处理 dirty component
5. 同步场景中，立即执行 state 更新操作。
```

2. fiber

````md
主要思想：

通过主动让出机制，利用浏览器的每帧执行剩余时间来执行一些短任务。保证线程资源的充分利用，以及稳定的渲染效率。

核心流程：

1. 以 60 FPS 为参考标准，浏览器更新试图的周期为 16.6s。
2. 浏览器单线程运行任务，导致 task 会阻塞 UI rneder。
3. 当一帧的任务执行时间超过 16.6s，会导致视图卡顿。
4. 在 react 当中将任务依照优先级分为 5 级，两类，一类同步事件，和其他低优先级事件。
5. 通过 requestIdelCallback 来排布任务的执行, 在执行一个短任务后，判断是否超过约定时间，如果超过，则将后续任务再次放入 requestIdelCallback 中，等待下一轮的浏览器调度。

```typescript
interface IdleDealine {
  didTimeout: boolean; // 表示任务执行是否超过约定时间
  timeRemaining(): DOMHighResTimeStamp; // 任务可供执行的剩余时间
}

function requestIdleCallback(
  callback: (dealine: IdleDeadline) => void,
  option?: { timeout: number }
) {}
```

6. 这要求对一个大任务的执行步骤，要进行合理拆分成多个耗时较短的子任务，并主动将后续任务放到下个执行栈。对于任务耗 时的预估会影响页面性能表现。
7. requestIdelCallback 底层使用 requestAnimationFrame api, 任务的执行时机由浏览器来决定，它将吻合浏览器的刷新频率。

表现：

1. Fiber 将浏览器每一帧的 CPU 资源都充分使用，但并不会减少任务总耗时。
2. Fiber 在一定程度上，将任务运行的起止时间拉长，但在 CPU 高运行速率下用户一般感知不到这种时间延长。
3. Fiber 要在实现中需要人为的做任务切分，主动让出，编码难度比较高。
````

3. diff

```Typescript

interface VNodeElement {
  type: string;
  props: {
    [k: string]: any
  };
  children: VNodeElement[] | null;
}

compareDomElement(oldVNode: VNodeElement, newVNode: VNodeElement, ele: HTMLElement) {
  let newEle = ele;

  function destrotVNode(vnode, ele) {

  }

  function destroyDom(ele) {
    ele.parentNode.removeChild(ele);
  }

  function replaceDom(newEle, oldEle) {
    oldEle.parent.replaceChild(newEle, oldEle);
  }

  let newEle;
  if (!newVNode) {
    // 如果新的vnode为空
    // 清理旧的vnode
    // 销毁dom结点
    destroyVNode(oldVNode, ele);
    destroyDom(ele);
  } else if (oldVNode.type !== newVNode.type || oldVNode.key !== newVNode.key) {
    destroyVNode(oldVNode, ele);
    newEle = initVnode(newVNode, context)
    replaceDom(newEle, ele);
  } else if (oldVNode.props)
}
```

4. hooks

```md
```

5. JIT

```md
动态类型语言的编译优化策略。

js 是一门解释性语言，不存在运行前编译阶段。js 引擎一边转译，一边运行。

JIT 通过检测代码片段的运行次数，来分级缓存运行结果及编译优化。将出现次数频繁的代码片段标记为 warn (重复多次)，hot (重复极多), 当再次出现重复代码的时候，可以使用缓存的编译后代码直接进行替换，从而提高运行效率。
```

6. redux

```typescript
interface Store {
  dispatch: (action: { type: string, [k: string]: any }) => void;
  subscribe: (fn: () => void): () => void;
  getState: {[k: string]: any};
  replaceReducer: (newReducer: () => void) => void;
}

function createStore(reducer, initState = {}): Store {
  globalStore = initState;
  subscribeCallbacks = [];
  currentState = initState;
  currentReducer = reducer;
  isDispatch = false;


  dispatch(action) {
    if (!action || typeof action !== 'object' || !('type' in action)) {
      console.log('not a legal action');
      return;
    }

    if (isDispatch) {
      console.log("it's dispatching");
      return
    }

    isDispatch = true;
    globalState = reducer(currentState, action)
    isDispatch = false;

    if (subscribeCallbacks.length) {
     for(let i = 0; i < subscribeCallbacks.length; i += 1) {
      subscribeCallbacks(i)();
     }
    }

    return action;
  },

  subscribe(fn) {
    subscribeCallbacks.push(fn);

    return unsubscribe() {
      const i = subscribeCallbacks.indexOf(fn);
      if (i > -1) {
        subscribeCallbacks.splice(i, 1);
      }
    }
  },

  getState() {
    return globalStore;
  },

  replaceReducer(newReducer) {
    currentReducer = newReducer;
  }

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }
}

```

7. redux-middleware

```js
// 实现redux-thunk

const reduxThunk = ({ dispatch, getState }) => next => action => {
  if (action instanceof Function) {
    return action(dispatch, getState);
  }

  return next(action);
};
```

#### 常见场景问题

1. 从输入 url 到页面展示经过哪些过程？优化策略？

```md
1. 寻址

通过 url 寻找域名 IP, 查询主机 hosts 是否有对应的域名 IP，不存在时逐级向上级 DNS 服务器查询 IP。

2. 建立连接

先建立传输层 TCP 连接，经历三次握手

3. Http

根据请求参数构建 HTTP 报文，并发送实际的请求。

4. 服务端响应

服务端接收到请求，通过后端路由系统分发到具体处理任务的服务当中，并予以前端响应。

5. 前端渲染

接收到服务器回传的内容（HTML）, 将 HTML 解析成 DomTree 和 CssTree，最终合并成 renderTree。浏览器从上到下渲染页面。

6. 处理 link 和 script

遇到响应的资源请求，将发送请求到相应服务端。

优化策略：

1. 对于确知无误的域名 IP 可以配置在 host 中。
2. 减少请求数量，保障 request 不阻塞。
3. 开启浏览器缓存。
4. html 中将 script 放在文档底部，以 UI 渲染优先。
5. 使用 CDN 加速资源请求响应速度。
6. 将小图片进行合并。
7. 使用压缩率更高的图片格式。
```

2. 浏览器常见安全问题及解决方案？

````md
1. xss

跨站脚本攻击，在表单中注入脚本，导致服务端存储了脚本。当输出到其他客户端时，脚本运行，攻击了其他用户的浏览器。

防御策略：对用户输入采取保守策略，过滤特殊字符。

2. csrf

跨站访问攻击，误点击恶意链接，被窃取了用户重要信息 cookie，从而可能造成用户信息泄漏，财产损失。

防御策略：cookie 采用同源策略限制，使用更高级别的用户身份认证机制。

3. sql 注入

前端在如登陆等功能上未做拦截，用户输入了可被执行的 sql 语句，从而跳过了登陆访问限制。

防御策略：前后端端对用户账户输入进行过滤和格式限制。

4. DDos 攻击

恶意对象采用高频次访问，使用大流量攻击目标服务器，造成服务器宕机，造成正常用户无法访问服务。

防御策略：采用分布式，可承载大容量的云服务器来部署服务。
···

3. http2, https, http3 细节？

```md
http2: 二进制传输，Header 压缩，多路复用，Server Push。

https: http + ssl, 对称加密加密报文，非对称加密加密秘钥，中间机构进行认证。

http3: 基于 UDP, 解决 TCP 传输速度和效率问题，无队头阻塞。
```

4. 浏览器缓存机制？

```md
from disk cache: 读取硬盘缓存

from memory cache: 读取浏览器缓存

浏览器是否使用缓存，缓存的有效时间多久，由服务器决定。

强缓存关键字段：

cache-control: no-cache， max-age
Expires: Thu, 31 Dec 2037 23:55:55 GMT

cache-control 可以设定一个相对时间长度，expires 设定的绝对时间，以此校验资源是否过期。二者可以共存，但 cache-control 优先级更高。

命中强缓存时状态码为 200。

协商缓存关键字段：

Last-Modified: 服务器最后一次更新时间

Etag: 服务器资源版本的唯一标示
```

5. js GC?

```md
标记清除：当创建一个变量时，为其添加标记，在任务执行完成后，变量不再被引用时，清除对于该变量的标记。回收期在定时扫描变量时，会清理掉这些未被引用的变量。

引用计数：当一个变量被引用时，计数变量+1。在回收期定时观察某一变量被引用次数为 0 时，视作其为无用变量，将被回收，清理内存空间。
```
````

```

```
