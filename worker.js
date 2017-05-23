if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');

// 路由处理, api处理交给koa-router, 前端交给react-router处理
const router = require('./server/router');

// log
app.use(logger());
app.use(router);

app.listen(8080, () => {
  console.log('localhost:8080 is listening!')
});

// 路由处理: api的路由处理交给koa-router, 前端页面交个react-router
