/* 
  本质上Koa封装了request,和response 
  所以当一个http请求过来的时候，需要一个异步的处理函数

  await next() // 处理下一个异步的函数
  await用来调用另一个异步的函数
*/
const Koa = require('Koa');
const app = new Koa();

const middlewares = require('./middleware');

/* middleware 
  app.use 注册async函数， 并传入next 和 ctx
  - await next(); ?
    将异步的函数处理成一个链, 每个函数做自己的事情，
    之后await next()去调用下一个async函数
*/

app.use(middlewares.printReqUrl);
app.use(middlewares.printReqTime);
app.use(middlewares.renderHTML);

app.listen(3000);
console.log('localhost:3000');