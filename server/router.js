const Router = require('koa-router');
const router = new Router();

const serverRender = require('./serverRender');

// api使用koa-router
function api() {
  router.get('/api/biztone', function(ctx) {
    ctx.body = 'biztone';
  });
  router.get('/api/index', function(ctx) {
    ctx.body = 'reserve';
  });
  return router.routes();
}

// koa-router 和 react-router
module.exports = async (ctx, next) => {
  console.log('ctx.path', ctx.path);
  if (ctx.path.match(/^\/api/)) {
    return await api()(ctx, next);   
  }

  return await reactComponent(ctx);

  // router.get('/api/', async function(ctx) { ctx.body = 'biztone' });
  // // others react-router to render
  // // await require('./render')(ctx, next)
  // router.get('/app/*', reactApp);
  // // ctx.body = 'react-router...这里有react-router 处理';
  // // await handleRender(ctx);
  // return router.routes();
};

function reactComponent (ctx) {
  // ctx.body = 'react-router';
  serverRender(ctx);
}

// import axios from 'axios';
// // 接口路由定义
// export default async function (ctx) {
//   return new Promise((resolve, reject) => {
//     if (ctx.req.url == '/zen') {
//       axios.get('https://api.github.com/zen').then(({data}) => {
//         resolve({zen: { text: [{text: data}]} });
//       })
//     } else {
//       resolve({});
//     }
//   })
// }
