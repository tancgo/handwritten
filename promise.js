// 三个状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(executor) {
    // 默认状态为PENDING
    this.status = PENDING;
    // 存放成功状态的值，默认为 undefined
    this.value = null;
    // 存放失败状态的值，默认为 undefined
    this.reason = null;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];

    try {
      // this默认指向类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是undefined），从而导致找不到print方法而报错。
      // 解决方法是构造方法中绑定this
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    // promise状态不可变更，防止 executor 中调用了两次 resovle/reject 方法
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;

      setTimeout(() => {
        this.onResolvedCallbacks.forEach((fn) => fn(value));
      });
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;

      setTimeout(() => {
        this.onRejectedCallbacks.forEach((fn) => fn(reason));
      });
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled, onRejected传的值可能为null，同时.then().then(() => {}), 需要解决then的穿透性
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => this.value;
    }

    if (typeof onRejected !== "function") {
      onRejected = (err) => {
        throw err;
      };
    }

    return new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 异步执行
        setTimeout(() => {
          const result = onFulfilled(this.value);
          this.parse(result, resolve, reject);
        });
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push((value) => {
          const result = onFulfilled(value);
          this.parse(result, resolve, reject);
        });
        this.onRejectedCallbacks.push((reason) => {
          const result = onRejected(reason);
          this.parse(result, resolve, reject);
        });
      }

      if (this.status === REJECTED) {
        // 异步执行
        setTimeout(() => {
          const result = onRejected(this.reason);
          this.parse(result, resolve, reject);
        });
      }
    });
  }

  parse(result, resolve, reject) {
    // 错误处理
    try {
      //  return可能是一个new MyPromise()
      if (result instanceof MyPromise) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = [];
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            values.push(value);

            if (values.length === promises.length) {
              resolve(values);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
}

// const p1 = new MyPromise((resolve) => {
//   resolve("1");
// });

// const p2 = new MyPromise((resolve, reject) => {
//   resolve("reject");
// });

// MyPromise.all([p1, p2]).then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

const p3 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve("222");
  }, 200);
});

const p4 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("333");
  }, 1000);
});

MyPromise.race([p3, p4]).then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
