// 乱序

// Math.random() - 0.5 随机得到一个正数、负数或是 0，
// 如果是正数则降序排列，如果是负数则升序排列，
// 如果是 0 就不变，然后不断的升序或者降序，最终得到一个乱序的数组。
// values.sort(() => Math.random() - 0.5);

// 将 [1, 2, 3, 4, 5] 乱序 10 万次，计算乱序后的数组的最后一个元素是 1、2、3、4、5 的次数分别是多少。
var times = [0, 0, 0, 0, 0];

for (var i = 0; i < 100000; i++) {
  let arr = [1, 2, 3, 4, 5];

  arr.sort(() => Math.random() - 0.5);

  times[arr[4] - 1]++;
}

console.log(times);
// 一次随机的结果为：[ 25073, 7029, 21006, 18608, 28284 ]，可以明显看出不是完全随机的
// 这是因为在v8引擎下 sort用到了插入排序  插入排序是局部有序 排好序的就不再随机了
Array.prototype.insertSort = function () {
  for (let i = 1; i < this.length; i++) {
    let j = i; // 从第二个数开始往前比

    while (j > 0) {
      if (this[j - 1] > this[j]) {
        [this[j - 1], this[j]] = [this[j], this[j - 1]];
      } else break;
      j--;
    }
    console.log(this);
  }
};

const arr = [5, 8, 11, 1, 78, 9, 2];

arr.insertSort();

// 完全随机使用Fisher-Yates算法
function shuffle(arr) {
  for (let i = arr.length; i > 0; i--) {
    const j = (Math.random() * i) | 0;
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }

  return arr;
}

// const arr = [1, 2, 3, 4, 5];

// shuffle(arr);

const counts = 100000;
const res = {};

for (let i = 0; i < counts; i++) {
  const arr = shuffle([1, 2, 3]);

  const key = JSON.stringify(arr);
  res[key] ? res[key]++ : (res[key] = 1);
}

// 为了方便展示，转换成百分比
for (const key in res) {
  res[key] = (res[key] / counts) * 100 + "%";
}

/**
 * 概率基本相同，实现了完全的乱序
 * {
  '[3,2,1]': '16.681%',
  '[2,1,3]': '16.625999999999998%',
  '[1,3,2]': '16.551%',
  '[2,3,1]': '16.875%',
  '[3,1,2]': '16.817%',
  '[1,2,3]': '16.45%'
}
 */
console.log(res);
