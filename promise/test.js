const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      setTimeout(() => {
        this.onResolvedCallbacks.forEach((fn) => fn());
      });
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;

      setTimeout(() => {
        this.onRejectedCallbacks.forEach((fn) => fn());
      });
    }
  }

  parse(result, resolve, reject) {
    try {
      if (result instanceof MyPromise) {
        result.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => this.value;
    }

    if (typeof onRejected !== "function") {
      onRejected = (err) => {
        throw err;
      };
    }

    return new MyPromise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          const result = onFulfilled(this.value);
          this.parse(result, resolve, reject);
        });

        this.onRejectedCallbacks.push(() => {
          const result = onRejected(this.reason);
          this.parse(result, resolve, reject);
        });
      }

      if (this.status === FULFILLED) {
        setTimeout(() => {
          const result = onFulfilled(this.value);
          this.parse(result, resolve, reject);
        });
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          const result = onRejected(this.reason);
          this.parse(result, resolve, reject);
        });
      }
    });
  }

  finally(callback) {
    console.log(this instanceof MyPromise, "this");
    return this.then(
      () => {
        callback();
      },
      () => {
        callback();
      }
    );
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = [];

      promises.forEach((promise) => {
        promise.then(
          (value) => {
            console.log(value, "value");
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
