// 如果需要大量重复的计算，或者大量计算又依赖于之前的结果，便可以考虑使用函数记忆
function memoize(f) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }

    return (cache[key] = f.apply(this, args));
  };
}

var count = 0;

var fibonacci = function (n) {
  count++;

  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};
for (var i = 0; i <= 10; i++) {
  fibonacci(i);
}

/**
 * 
 * 当执行 fib(0) 时，调用 1 次

   当执行 fib(1) 时，调用 1 次

   当执行 fib(2) 时，相当于 fib(1) + fib(0) 加上 fib(2) 本身这一次，共 1 + 1 + 1 = 3 次

   当执行 fib(3) 时，相当于 fib(2) + fib(1) 加上 fib(3) 本身这一次，共 3 + 1 + 1 = 5 次

   当执行 fib(4) 时，相当于 fib(3) + fib(2) 加上 fib(4) 本身这一次，共 5 + 3 + 1 = 9 次

   当执行 fib(5) 时，相当于 fib(4) + fib(3) 加上 fib(5) 本身这一次，共 9 + 5 + 1 = 15 次

   当执行 fib(6) 时，相当于 fib(5) + fib(4) 加上 fib(6) 本身这一次，共 15 + 9 + 1 = 25 次

   当执行 fib(7) 时，相当于 fib(6) + fib(5) 加上 fib(7) 本身这一次，共 25 + 15 + 1 = 41 次

   当执行 fib(8) 时，相当于 fib(7) + fib(6) 加上 fib(8) 本身这一次，共 41 + 25 + 1 = 67 次

   当执行 fib(9) 时，相当于 fib(8) + fib(7) 加上 fib(9) 本身这一次，共 67 + 41 + 1 = 109 次

   当执行 fib(10) 时，相当于 fib(9) + fib(8) 加上 fib(10) 本身这一次，共 109 + 67 + 1 = 177 次
 */

console.log(count); // 453

var count1 = 0;
var fibonacci1 = function (n) {
  count1++;
  return n < 2 ? n : fibonacci1(n - 1) + fibonacci1(n - 2);
};

fibonacci1 = memoize(fibonacci1);

for (var i = 0; i <= 10; i++) {
  fibonacci1(i);
}

console.log(count1); // 11
