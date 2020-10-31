// 第一版
function debounce0(func, wait) {
  let timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(func, wait);
  };
}

let count = 1;
const container = document.getElementById("container");

function getUserAction(e) {
  console.log(this);
  console.log(e);
  container.innerHTML = count++;
}

/**
 * 没有防抖的情况下，getUserAction 中的this打印值为<div id="container"></div>, e打印出MouseEvent 对象
 */
// container.onmousemove = getUserAction;

/**
 * 第一版中this会指向window对象，e 为undefined
 */
// container.onmousemove = debounce0(getUserAction, 1000); // 移动完1秒内不再触发，才执行

// 第二版,增加this 的处理，增加事件处理函数中会提供事件对象 event
function debounce1(func, wait) {
  let timer;

  return function (...arg) {
    const that = this; // 此时的that指向container

    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, arg); // 此时的func(普通函数)如果不经过apply， this指向window，箭头函数可以直接写this
    }, wait);
  };
}

// container.onmousemove = debounce1(getUserAction, 1000);

// 第三版， 希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
function debounce2(func, wait, immediate) {
  let timer;

  return function (...args) {
    const that = this;

    if (timer) clearTimeout(timer);

    if (immediate) {
      // 如果已经执行过便不再执行
      const callNow = !timer;

      timer = setTimeout(() => {
        timer = null;
      }, wait);

      if (callNow) func.apply(that, args);
    } else {
      timer = setTimeout(() => {
        func.apply(that, args);
      }, wait);
    }
  };
}

container.onmousemove = debounce2(getUserAction, 1000, false);
