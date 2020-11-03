const Koa = require("./koa2");

const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('第一次  开始');
  await next();
  console.log('第一次  结束');
  const ms = Date.now() - start;
  console.log(`${ctx.req.method} ${ctx.req.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('第二次  开始');
  await next();
  console.log('第二次  结束');
  const ms = Date.now() - start;
  console.log(`${ctx.req.method} ${ctx.req.url} - ${ms}ms`);
});

app.use(async ctx => {
  console.log('第三次  开始');
  ctx.res.end('this is like koa2')
  console.log('第三次  结束');
})

app.listen(8000)
