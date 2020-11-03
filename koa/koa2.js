const http = require("http");

function compose(middleware) {
  return function (ctx) {
    let index = -1;

    function dispatch(i) {
      const fn = middleware[i];
      index = i;
      if (!fn) return Promise.resolve();

      console.log(fn, i, "fn");

      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return dispatch(0);
  };
}

class Koa {
  constructor() {
    this.middleware = [];
  }

  use(fn) {
    this.middleware.push(fn);
    console.log(fn, "push");

    // return this 支持链式调用
    return this;
  }

  createContext(req, res) {
    const ctx = {
      req,
      res,
    };

    ctx.query = req.query;
    ctx.method = req.method;
    ctx.url = req.url;

    return ctx;
  }

  handleRequest(ctx, fn) {
    return fn(ctx);
  }

  callback() {
    const fn = compose(this.middleware);

    return (req, res) => {
      const ctx = this.createContext(req, res);

      return this.handleRequest(ctx, fn);
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());

    server.listen(...args);
  }
}

module.exports = Koa;
