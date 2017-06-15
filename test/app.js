/* 
  本质上Koa封装了request,和response 
  所以当一个http请求过来的时候，需要一个异步的处理函数

  await next() // 处理下一个异步的函数
  await用来调用另一个异步的函数
*/

const router = require('koa-router')();

const fs = require('fs');
// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
const files = fs.readdirSync(__dirname + '/controller');
// 处理每个js文件
for (let f of files) {
   console.log(`process controller: ${f}...`);
   // 当前这个问题
   let mapping = require(__dirname + '/controller/' + f);
   for (let url in mapping) {
     // url是从GET开头的
     if (url.startsWith('GET')) {
       const path = url.substring(4);
       router.get(path, mapping[url]);
       console.log(`register URL mapping: GET ${path}`);
     } else if (url.startsWith('POST')) {
       const path = url.substring(5);
       router.get(path, mapping[url]);
       console.log(`register URL mapping: Post ${path}`);
     } else {
       console.log('无效的url');
     }
   }
}

const Koa = require('Koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');

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