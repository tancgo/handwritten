Promise.resolve().then(() => {
  setTimeout(() => {
    console.info(4)
  }, 0);
  console.info(0)
})

setTimeout(() => {
  console.info(1)
}, 0);

console.log(2);

Promise.resolve().then(() => {
  console.info(3)
})

// 打印顺序 2 0 3 1 4