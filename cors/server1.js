const http = require("http");

http
  .createServer(function (request, response) {
    // 满足以下条件的即为简单请求：
    // 跨域默认允许的方法 GET HEAD POST 不需要预请求
    // Content-Type的值只有以下三种(Content-Type一般是指在post请求中，get请求中设置没有实际意义
    // text/plain
    // multipart/form-data
    // application/x-www-form-urlencoded

    // 非简单请求即为复杂请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight），
    // "预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的：
    // Access-Control-Request-Method
    // Access-Control-Request-Headers

    // CORS与JSONP的使用目的相同，但是比JSONP更强大。
    // JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。
    response.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT, DELETE",
    });

    response.end("123");
  })
  .listen(8887);
