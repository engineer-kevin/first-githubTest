const {
  resolve,
  reject
} = require("./promise");

class MyPromise {
  // 构造器
  constructor(executor) {
    // 初始化state为等待态
    this.status = 'pending';

    // 成功的值
    this.value = undefined;

    // 失败的原因
    this.reason = undefined;

    // 成功存放的数组
    this.onResolvedCallbacks = [];

    // 失败存放法的数组
    this.onRejectedCallbacks = [];

    // 成功
    let resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    // 失败
    let reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 如果executor执行报错，直接执行reject
    try {
      // 立即执行
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // then 方法 有两个参数onFulfilled onRejected
  then(onFulfilled, onRejected) {
    let promise2 = new MyPromise((resolve, reject) => {
      // 状态为fulfilled，执行onFulfilled，传入成功的值
      if (this.status === 'fulfilled') {
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      }

      // 状态为rejected，执行onRejected，传入失败的原因
      if (this.status === 'rejected') {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }

      // 当状态state为pending时, 发布订阅
      if (this.status === 'pending') {
        // onFulfilled传入到成功数组
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          // onRejected传入到失败数组
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    })

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve,  reject) {
  
}

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
})

p.then(res => {
  console.log(res);
  return res;
}, err => {
  console.log(err)
}).then(res2 => {
  console.log(res2);
})