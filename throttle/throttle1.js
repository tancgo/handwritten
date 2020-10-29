function throttle1(func, wait) {
  let timeout = null;
  let previous = 0;

  return function (...args) {
    const now = new Date()
    // 会根据
    if (now - previous > wait) {
      console.log('111');
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      func.apply(this, args)
      previous = now
    } else if (!timeout) {
      console.log('222');
      timeout = setTimeout(function() {
        timeout = null
        previous = new Date()
        console.log('333');
        func.apply(this, args)
      }, wait);
    }
  }
}

let count = 1;
const container = document.getElementById("container");

function getUserAction(e) {
  console.log(this, "this");
  // console.log(e, "args");
  container.innerHTML = count++;
}

container.onmousemove = throttle1(getUserAction, 3000);