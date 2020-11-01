function myflat(arr, depth = 1) {
  return depth > 0
    ? arr.reduce((acc, item) => {
        return acc.concat(Array.isArray(item) ? myflat(item, depth - 1) : item);
      }, [])
    : [...arr];
}

Array.prototype.myflat = function (depth = 1) {
  // depth = false / '-1'等情况
  if (!Number(depth) || Number(depth) < 0) {
    return this;
  }

  const arr = [].concat(this);

  return depth > 0
    ? arr.reduce((acc, item) => {
        return acc.concat(Array.isArray(item) ? item.myflat(--depth) : item);
      }, [])
    : arr.slice();
};

// 无递归版本, 使用栈
function flatten(arr) {
  const stack = [...arr];
  const res = [];

  while (stack.length) {
    const cur = stack.pop();

    if (Array.isArray(cur)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入
      stack.push(...cur);
    } else {
      res.push(cur);
    }
  }

  // 反转恢复原数组的顺序
  return res.reverse();
}

// 利用concat会自动拉平一层的特性
function flatten1(arr, depth = 1) {
  while (arr.some((item) => Array.isArray(item)) && depth > 0) {
    arr = [].concat(...arr);
    depth--;
  }

  return arr;
}

function* generator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* generator(item);
    } else {
      yield item;
    }
  }
}

// 利用generator函数的特性
function flatten2(arr, depth = 1) {
  function* generator(arr, depth) {
    for (const item of arr) {
      if (Array.isArray(item) && depth > 0) {
        yield* generator(item, depth - 1);
      } else {
        yield item;
      }
    }
  }

  return [...generator(arr, depth)];
}

var arr = [1, [2, [3, 4]]];

console.log(arr.myflat(), "proto");

console.log(myflat(arr));

console.log(flatten(arr));

console.log(flatten1(arr, 2));
