const express = require("./express");

const app = new express();

app.use((req, res, next) => {
  console.log("请求开始...", req.method, req.url);
  next();
});

app.get("/api", (req, res, next) => {
  console.log("get /api 路由");
  res.json('1213')
});

app.listen(8001, () => {
  console.log("server is running on port 8001");
});
