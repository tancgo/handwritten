Function.prototype.mycall = function (context, ...args) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    // context 为原始值(string, number, boolean) 时， 由于需要构造出一个对象，所以Object(context)
    context = Object(context);
  }

  // 将函数设为对象的属性
  context.fn = this;
  // 将传入的参数传给fn， 执行该函数
  var result = context.fn(...args);
  // 删除该函数
  delete context.fn;

  // 考虑到函数有返回值的情况 需要return
  return result;
};

// 测试一下
var value = 2;

var obj = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age,
  };
}

console.log(bar.mycall(obj, "kevin", 18));
