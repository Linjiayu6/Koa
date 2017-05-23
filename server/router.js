const Router = require('koa-router');
const router = new Router();

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
  if (ctx.path.match(/^\/api/)) {
    return await api()(ctx, next);
  }
  // others react-router to render
  // await require('./render')(ctx, next)
  console.log('react-router....');
};
