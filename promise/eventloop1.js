console.log(1);

setTimeout(() => {
  console.log(2);

  new Promise((resolve) => {
    console.log(3);
  }).then(() => {
    // 没有resolve 走不进来
    console.log(4);
  });
});

new Promise((resolve) => {
  console.log(5);
  resolve();
}).then(() => {
  console.log(6);
});

setTimeout(() => {
  console.log(7);

  new Promise((resolve) => {
    console.log(8);
    resolve();
  }).then(() => {
    console.log(9);
  });
});

// 结果 1 5 6 2 3 7 8 9