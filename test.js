// 给定一个数组和数字n,求数组和大于等于n的最短连续子数组的长度
const nums = [5, 7, 3, 4, 8, 2, 9, 1, 6];

function calc(nums, n) {
  let left = 0;
  let min = Infinity;
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= n) return 1;

    sum += nums[i];
    while (sum >= n) {
      min = Math.min(i - left + 1, min);

      sum -= nums[left];
      left++;
    }
  }

  return min !== Infinity ? min : -1;
}

// console.log(calc(nums, 8));
console.log(calc(nums, 17));
// console.log(calc(nums, 15));
// console.log(calc(nums, 10));
// console.log(calc(nums, 20));
