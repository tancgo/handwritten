// 红灯3秒亮1次，绿灯2秒亮1次，黄灯1秒亮1次；如何让三个灯不断交替重复亮灯？
function light() {
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("red");
      resolve();
    }, 3000);
  })
    .then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("green");
          resolve();
        }, 2000);
      });
    })
    .then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("yellow");
          resolve();
        }, 1000);
      });
    })
    .then(() => {
      light();
    });
}

// 优化
function flash(color) {
  console.log(color);
}

function light(color, timer) {
  return new Promise((resolve) => {
    setTimeout(() => {
      flash(color);
      resolve();
    }, timer);
  });
}

function step() {
  Promise.resolve()
    .then(() => {
      return light("red", 3000);
    })
    .then(() => {
      return light("green", 2000);
    })
    .then(() => {
      return light("yellow", 1000);
    })
    .then(() => {
      step();
    });
}

// 对 step 函数的优化
async function stepAwait() {
  await light("red", 3000);
  await light("green", 2000);
  await light("yellow", 1000);
}
stepAwait();
