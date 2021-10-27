Array.prototype.myReduce = function (fn, initialValue) {
  // 因为是数组调用 myReduce方法所以this指向当前数组
  // 初始化要返回累加值： 如果有传初始值则acc的初始值为initialValue，否则为数组的第一个个值
  let acc = initialValue || this[0]

  // 定义开始计算的索引：如果有传初始值则为0，否则为1
  const startIndex = initialValue ? 0 : 1

  // 遍历数组 执行传进来的函数（四个参数，前两个是重点，1：当前累加总和，2：当前要累加的值，3：当前要累加值的索引，4：当前的数组）
  for (let i = startIndex; i < this.length; i++) {
    acc = fn(acc, this[i], i, this)
  }

  // 返回累加值
  return acc
}

console.log([1, 2, 3].myReduce((a, b) => a + b))
console.log([1, 2, 3].myReduce((a, b) => a + b, 10))
