var array = [
  1,
  1,
  "1",
  "1",
  null,
  null,
  undefined,
  undefined,
  new String("1"),
  new String("1"),
  /a/,
  /a/,
  NaN,
  NaN,
];

function unique0(arr) {
  return [...new Set(arr)];
}

console.log(unique0(array)); // 缺点是对象不能去重 [ 1, '1', null, undefined,[String: '1'], [String: '1'], /a/, /a/, NaN ]

function unique(arr) {
  const obj = {};

  return arr.filter((item) => {
    const key = typeof item + JSON.stringify(item)
    return obj.hasOwnProperty(key)
      ? false
      : (obj[key] = true);
  });
}

console.log(unique(array)); // [ 1, '1', null, undefined, [String: '1'], /a/, NaN ] 对象也支持去重
