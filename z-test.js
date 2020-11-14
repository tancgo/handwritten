const p0 = new Promise((resolve, reject) => {
  resolve(1);
});

const p1 = new Promise((resolve, reject) => {
  resolve(2);
});

const p2 = new Promise((resolve, reject) => {
  reject(3);
});

const p3 = new Promise((resolve, reject) => {
  reject(4);
});

const p4 = new Promise((resolve, reject) => {
  resolve(5);
});

Promise.allSettled([p0, p1, p2, p3, p4]).then((value) => {
  console.log(value);

  let count = 0;

  value.forEach(({ status }) => {
    if (status === "rejected") count++;
  });

  console.log(count, "count");
});
