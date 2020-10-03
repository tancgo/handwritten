// 利用 compose 将多个函数组合成一个函数，让代码从右向左运行，而不是由内而外运行，可读性大大提升。这便是函数组合。
function compose(...funcs) {
  // 如果参数长度为0， 则返回一个最简单的函数，即传入什么就返回什么的函数
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  // funcs.reduce((acc, func) => {
  //   return (...args) => {
  //     return acc(func(...args));
  //   };
  // });

  // 简化后
  return funcs.reduce((acc, func) => (...agrs) => acc(func(...agrs)));
}

const toUpperCase = function (x) {
  return x.toUpperCase();
};
const hello = function (x) {
  return "HELLO, " + x;
};

const greet = compose(hello, toUpperCase);

greet("tancgo");
