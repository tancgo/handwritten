// 利用 compose 将多个函数组合成一个函数，让代码从右向左运行，而不是由内而外运行，可读性大大提升。这便是函数组合。
compose = (...funcs) => {
  // 如果参数长度为0， 则返回一个最简单的函数，即传入什么就返回什么的函数
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  /**
   * 第几轮循环      acc                                      func                返回的值
   * 第一轮循环	     fn1	                                    fn2	                (...args) => fn1(fn2(...args))
   * 第二轮循环	     (...args) => fn1(fn2(...args))	          fn3	                (...args) => fn1(fn2(fn3(...args)))
   * 第三轮循环	     (...args) => fn1(fn2(fn3(...args)))	    fn4	                (...args) => fn1(fn2(fn3(fn4(...args))))
   */

  // funcs.reduce((acc, func) => {
  //   return (...args) => {
  //     return acc(func(...args));
  //   };
  // });

  // 简化后
  return funcs.reduce((acc, func) => (...args) => acc(func(...args)));
};

const renderName = (x) => x.toUpperCase();
const hello = (x) => `HELLO ${x}`;

const greet = compose(hello, renderName);

console.log(greet("tancgo"));
