// bind() 方法会创建一个新函数。
// 当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this
// 之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
// Function.prototype.mybind = function (context, ...args) {
//   console.log(this, context);
//   var self = this; // this为调用mybind的函数

//   // 执行bind后返回的函数可以二次传参
//   return function (...secondArgs) {
//     return self.apply(context, args.concat(secondArgs));
//   };
// };

// var foo = {
//   value: 1,
// };

// function bar() {
//   return this.value;
// }

// var bindFoo = bar.mybind(foo);

// console.log(bindFoo()); // 1

// var foo = {
//   value: 1,
// };

// function bar(name, age) {
//   console.log(name);
//   console.log(age);
//   return this.value;
// }

// var bindFoo = bar.bind(foo, "daisy");
// console.log(bindFoo("18"));

// 构造函数效果的模拟实现
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

Function.prototype.mybind = function (context, ...args) {
  console.log(this, context);
  var self = this; // this为调用mybind的函数

  // 执行bind后返回的函数可以二次传参
  var fbind = function (...secondArgs) {
    // 当作为构造函数时，this 指向实例
    return self.apply(
      this instanceof fbind ? this : context,
      args.concat(secondArgs)
    );
  };

  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  /**
   * 直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。
   * fbind.prototype = self.prototype;
   */

  // create相当于Object.create(), 可以通过一个空函数来进行中转, 通过new继承
  /**
    * Object.create = function( o ) {
      function f(){}
      f.prototype = o;
      return new f;
      };
    */
  var create = function () {};

  create.prototype = self.prototype;
  fbind.prototype = new create();

  return fbind;
};

var value = 2;

var foo = {
  value: 1,
};

function bar(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = "kevin";

var bindFoo = bar.mybind(foo, "daisy");

var obj = new bindFoo("18");
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
