function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // 第三个参数是否异步 默认为true
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onload = function () {
      console.log(this, this === xhr, "this");
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject("加载失败");
      }
    };
    xhr.onerror = function () {
      reject(this);
    };
  });
}

// 执行需要在浏览器环境下或者安装XMLHttpRequest模块
ajax("https://jsonplaceholder.typicode.com/photos").then((res) =>
  console.log(res, "res")
);
