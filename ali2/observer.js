// 3. 使用Object.defineProperty，实现Watcher&Observer，实现vue的双向绑定。(50分钟，请写出demo)

// 观察对象 
const obj =  {};

let observerObject =  '';

const Observer = (target,  k)  => {
Object.defineProperty(target,  k, {
     getter() {
          // 读取对象属性 
          console.log(`${target}.${k}:`, value);
          return `value=${observerObject}`
        },
       setter(v) {
          //  修改对象方法时，可以进行副作用操作
          //  如将该值赋值给监听者
           observerObject = v;
   target[k] = v;
        }
    })
}

console.log(obj.a);

obj.a  =  'xxx';


// 使用ES6  proxy 实现双向绑定


// 观察对象
let obj  =  {};


const processer = () =>  {
   //  注入getter一些副操作
getter(target,  property) {
       console.log(`you've gotten the value  of  ${target}.${property}`);
      return `${property}`
    },
    //  修改setter
    setter(target, property, value)  {
       console.log(`you are changing the value of  ${target}.${property}`);
     if (target.hasOwnProperty(property)) {
         target[property] = value
        }
    }
}

//  可同时代理整个被观察者的所有属性，并且可以解决数组双向绑定的问题
obj  =  new  Proxy(obj, processer);

console.log(obj.name);

obj.use  =  'xxxx';
