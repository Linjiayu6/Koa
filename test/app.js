/* 
  本质上Koa封装了request,和response 
  所以当一个http请求过来的时候，需要一个异步的处理函数

  await next() // 处理下一个异步的函数
  await用来调用另一个异步的函数
*/

const Koa = require('Koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const routes = require('./handleRoutes');

const views = require('koa-views');

// 增加静态资源文件地址
const assets = require('koa-static');

/*
  post请求, 如果没有加入body-parser的话~ 是解析不到request的body的功能的
  返回的结果是undefined
*/
const middlewares = require('./middleware');


/* middleware 
  app.use 注册async函数， 并传入next 和 ctx
  - await next(); ?
    将异步的函数处理成一个链, 每个函数做自己的事情，
    之后await next()去调用下一个async函数
*/

app.use(middlewares.printReqUrl);

// middleware assets
app.use(assets(__dirname + '/static/'));

/*
  如果只请求http://localhost:3000/biztone, 后端的内容都不会被render
  log只有 1. 请求地址 /biztone
*/

// bodyParser必须放到router之前
app.use(bodyParser());

// template engine 必须在路由之前注册
app.use(views(__dirname + '/views', { map: { html: 'nunjucks' }}));

// app.use(router.routes());
app.use(routes());


app.use(middlewares.printReqTime);
app.use(middlewares.renderHTML);

app.listen(3000);
console.log('localhost:3000');