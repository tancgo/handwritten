// chain.eat().sleep(5).eat().sleep(6).eat().work()

// 输出结果eat -> sleep(5) -> eat -> sleep(6) -> eat -> work

class Chain {
  constructor() {
    this.task = Promise.resolve();
  }

  eat() {
    this.task = this.task.then(() => {
      console.log("eat");
    });

    return this;
  }

  work() {
    this.task = this.task.then(() => {
      console.log("work");
    });

    return this;
  }

  sleep(wait) {
    this.task = this.task.then(
      () =>
        new Promise((resolve) => {
          console.log("sleep start");
          setTimeout(() => {
            resolve();
            console.log("sleep end");
          }, wait * 1000);
        })
    );

    return this;
  }
}

const chain = new Chain();

// console.log(typeof chain.eat().sleep(5));

chain.eat().sleep(5).eat().sleep(6).eat().work()
