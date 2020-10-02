//  new 实现的功能：
// 访问到 Otaku 构造函数里的属性
// 访问到 Otaku.prototype 中的属性

// Otaku 御宅族，简称宅
function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = "Games";
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log("I am " + this.name);
};

var person = myNew(Otaku, "Kevin", "18");

console.log(person.name); // Kevin
console.log(person.habit); // Games
console.log(person.strength); // 60

person.sayYourName(); // I am Kevin

function myNew(constructor, ...args) {
  var instance  = Object(null); // Object(null) 和 new Objec()相同，返回的是有__proto__属性的对象，而Object.create(null)返回的是一个每个任何属性的空对象

  instance .__proto__ = constructor.prototype; // 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性

  var res = constructor.apply(instance , args); // 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性

  // 如果执行结果有返回值并且是一个对象或者函数的时候，返回执行的结果，否则返回新创建的对象obj
  // https://github.com/mqyqingfeng/Blog/issues/13
  return res instanceof Object ? res : instance ;
}
