Function.prototype.myapply = function (context, args) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    // context 为原始值(string, number, boolean) 时， 由于需要构造出一个对象，所以Object(context)
    context = Object(context);
  }

  context.fn = this;
  var result = context.fn(...args);
  delete context.fn;

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

console.log(bar.myapply(obj, ["kevin", 18]));