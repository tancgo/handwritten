const http = require("http");
const slice = Array.prototype.slice;

class Express {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [], // app.use 注册的中间件
      get: [],
      post: [],
    };
  }

  register(path) {
    const info = {};

    console.log(path, "path");

    if (typeof path === "string") {
      info.path = path;
      // 取出单个use注册的所有的中间件
      info.stack = slice.call(arguments, 1);
    } else {
      // app.use 第一个参数不是路由时， 设置为根路由
      info.path = "/";
      info.stack = slice.call(arguments, 0);
    }

    return info;
  }

  use() {
    const info = this.register.apply(this, arguments);

    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);

    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);

    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = [];

    if (url === "/favicon.ico") {
      return stack;
    }

    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    curRoutes = curRoutes.concat(this.routes[method]);

    curRoutes.forEach((routeInfo) => {
      console.log(routeInfo, "routeInfo");
      // url = '/api/user' 且 routeInfo = '/'
      // url = '/api/user' 且 routeInfo = '/api'
      // url = '/api/user' 且 routeInfo = '/api/user'
      if (url.indexOf(routeInfo.path) === 0) {
        stack = stack.concat(routeInfo.stack);
      }
    });

    return stack;
  }

  // 核心的 next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift();

      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next);
      }
    };

    next();
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      const url = req.url;
      const method = req.method.toLowerCase();

      const resultList = this.match(method, url);

      this.handle(req, res, resultList);
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = Express;
