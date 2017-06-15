/* 
  本质上Koa封装了request,和response 
  所以当一个http请求过来的时候，需要一个异步的处理函数

  await next() // 处理下一个异步的函数
  await用来调用另一个异步的函数
*/
const Koa = require('Koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
// get请求
router.get('/biztone', async (ctx, next) => {
  ctx.response.body = '<div>biztone</div>';
});

router.get('/createpost', async (ctx, next) => {
  ctx.response.body = `
    <form action="/post" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
    </form>
  `;
});

/*
  post请求, 如果没有加入body-parser的话~ 是解析不到request的body的功能的
  返回的结果是undefined
*/
router.post('/post', async (ctx, next) => {
  ctx.response.body = `${JSON.stringify(ctx.request.body)}`;
});

const middlewares = require('./middleware');

/* middleware 
  app.use 注册async函数， 并传入next 和 ctx
  - await next(); ?
    将异步的函数处理成一个链, 每个函数做自己的事情，
    之后await next()去调用下一个async函数
*/

app.use(middlewares.printReqUrl);
/*
  如果只请求http://localhost:3000/biztone, 后端的内容都不会被render
  log只有 1. 请求地址 /biztone
*/

// bodyParser必须放到router之前
app.use(bodyParser());

app.use(router.routes());

app.use(middlewares.printReqTime);
app.use(middlewares.renderHTML);

app.listen(3000);
console.log('localhost:3000');