// chain.eat().sleep(5).eat().sleep(6).eat().work()

class Chain {
  constructor() {
    this.queue = [];

    setTimeout(() => {
      this.next();
    });
  }

  sleep(fn, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fn();
        resolve();
      }, delay * 1000);
    });
  }

  async next() {
    console.log(this.queue);
    for (const item of this.queue) {
      const { fn, delay = 0 } = item;

      await new Promise((resolve) => {
        setTimeout(() => {
          fn();
          resolve();
        }, delay * 1000);
      });
    }
  }

  eat() {
    const fn = function () {
      console.log("eat");
    };

    this.queue.push({ fn });

    return this;
  }

  work() {
    const fn = function () {
      console.log("work");
    };

    this.queue.push({ fn });

    return this;
  }

  sleep(delay) {
    const fn = function () {
      console.log("sleep");
    };

    this.queue.push({ fn, delay });

    return this;
  }
}

const chain = new Chain();

chain.eat().sleep(5).eat().sleep(6).eat().work();
