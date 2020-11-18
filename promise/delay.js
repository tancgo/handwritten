// taskSum(1000,()=>{console.log(1)}).task(1200,()=>{console.log(2)}).task(1300,()=>{console.log(2)})

class Task {
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
      }, delay);
    });
  }

  async next() {
    for (const item of this.queue) {
      const { fn, delay } = item;

      await this.sleep(fn, delay);
    }
  }

  task(delay, fn) {
    this.queue.push({ fn, delay });

    return this;
  }
}

const taskSum = function (delay, fn) {
  return new Task().task(delay, fn);
};

taskSum(1000, () => {
  console.log(1);
})
  .task(3000, () => {
    console.log(2);
  })
  .task(4000, () => {
    console.log(3);
  });
