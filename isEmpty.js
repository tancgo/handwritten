function isEmpty(obj) {
  for (const key in obj) {
    // if (obj.hasOwnProperty(key)) {
    //   return false;
    // }
    return false
  }
  return true;
}

function Person() {}
Person.prototype.name = "111";
var person = new Person();

console.log(isEmpty({})); // true
console.log(isEmpty([])); // true
console.log(isEmpty(null)); // true
console.log(isEmpty(undefined)); // true
console.log(isEmpty(1)); // true
console.log(isEmpty("")); // true
console.log(isEmpty(true)); // true
console.log(person, isEmpty(person)); // for in 还会遍历原型上的属性

