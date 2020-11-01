// 函数参数个数定长的函数柯里化
// function add(a, b, c, d) {
//   console.log(...arguments);
//   return [...arguments].reduce((a, b) => a + b);
// }

// function curring(fn) {
//   const length = fn.length; // 用来获取函数的形参个数

//   return function curried(...args) {
//     console.log(args, length);
//     // arguments.length 获取的是实参个数
//     if (args.length >= length) {
//       // 返回执行结果
//       return fn.apply(this, args);
//     }

//     return function (...args2) {
//       // 继续返回函数
//       return curried.apply(this, args.concat(args2));
//     };
//   };
// }

// let addCurry = curring(add);

// console.log(addCurry(1)(2, 3)(4)); // 10
// console.log(addCurry(1)(2)(3)(4)); // 10
// console.log(addCurry(1)(2)(3)(4)(5)); // 实参长度超过形参 报错

// 函数参数个数不定长的柯里化
function sum(...args) {
  return args.reduce((a, b) => a + b);
}

function currying(fn) {
  let args = [];
  return function curried(...newArgs) {
    // 如果有参数传入，则将参数存入args, 继续执行
    if (newArgs.length) {
      args = args.concat(newArgs);
      return curried;
    } else {
      const cloneArgs = args;
      args = []; // 需要置空，否则闭包会保存值，影响下一次调用的结果
      // 最后一步不传参数，此时已经在上一步拿到了全部参数，结束递归，执行原函数
      return fn.apply(this, cloneArgs);
    }
  };
}

const sumCurry = currying(sum);

// 注意调用方式的变化
console.log(sumCurry(1)(2)(3)(4)(5)());
console.log(sumCurry(1)());
console.log(sumCurry(1)(2)());

// 重写toString的方式
function add(...args) {
  const curied = function (...params) {
    return add.apply(null, args.concat(params));
  };

  curied.toString = () => args.reduce((a, b) => a + b);

  return curied;
}

// 返回的数字是函数类型
console.log(add(1)(2, 3)(4) | 0);

// 重写valueOf的方式
function sum(...args) {
  const curried = function (...params) {
    return sum(...args, ...params);
  };

  curried.valueOf = () => args.reduce((a, b) => a + b);

  return curried
}

console.log(sum(1)(2, 3)(4).valueOf())
