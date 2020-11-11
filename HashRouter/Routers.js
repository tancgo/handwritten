class Routers {
  constructor() {
    // 以键值对的形式储存路由
    this.routes = {};
    // 当前路由的url
    this.currentUrl = "";
  }

  // 将path路径和对应的callback函数储存
  route(path, callback) {
    this.routes[path] = callback || function () {};
  }

  // 刷新
  refresh() {
    // 获取当前url中的hash路径
    this.currentUrl = location.hash.slice(1) || "/";
    // 执行当前hash路径的callback函数
  }
}
