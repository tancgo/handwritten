// 使用时间戳， 当鼠标移入的时候，事件立刻执行，每过 1s 会执行一次，如果在 4.2s 停止触发，以后不会再执行事件。
function throttle(func, wait) {
  let previous = 0;

  return function (...args) {
    const that = this;
    const now = new Date();

    if (now - previous > wait) {
      func.apply(that, args);
      previous = now;
    }
  };
}

// 使用定时器，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
function throttle1(func, wait) {
  let timer = null;

  return function (...args) {
    const that = this;

    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(that, args);
      }, wait);
    }
  };
}

// 第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行
// 第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件

let count = 1;
const container = document.getElementById("container");

function getUserAction(e) {
  console.log(this);
  console.log(e);
  container.innerHTML = count++;
}

container.onmousemove = throttle1(getUserAction, 3000);
