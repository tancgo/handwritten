function myInstanceof(left, right) {
  while (left) {
    if (left.__proto__ === right.prototype) {
      return true;
    }

    left = left.__proto__;
  }

  return false;
}

console.log(myInstanceof([], Array));
console.log(myInstanceof(12, Array));
console.log(myInstanceof(12, Number));

