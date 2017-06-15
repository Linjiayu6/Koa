/* 
  本质上Koa封装了request,和response 
  所以当一个http请求过来的时候，需要一个异步的处理函数

  await next() // 处理下一个异步的函数
  await用来调用另一个异步的函数
*/
const Koa = require('Koa');
const app = new Koa();

app.use(async function(ctx, next) {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>test123123</h1>';
});

app.listen(3000);
console.log('localhost:3000');