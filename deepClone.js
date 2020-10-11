// 方法一 缺点是函数 symbol 等熟悉无法被拷贝

var arr = [
  function () {
    console.log("a");
  },
  {
    b: function () {
      console.log("b");
    },
  },
];

var tan = [1,2, () => {}]

var new_arr = JSON.parse(JSON.stringify(arr));

console.log(new_arr);

// 递归浅拷贝
function deepClone(obj) {
  function isObject(o) {
    return typeof o === "object" && o !== null;
  }

  if (!isObject(obj)) {
    throw new Error("非对象");
  }

  const newObj = obj instanceof Array ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const cur = obj[key];
      newObj[key] = isObject(cur) ? deepClone(cur) : cur;
    }
  }

  return newObj;
}

console.log(deepClone(arr));
console.log(deepClone(tan));
