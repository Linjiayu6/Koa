const Router = require('koa-router');
const router = new Router();

router.get('/biztone', function(ctx) {
  ctx.body = 'biztone';
});
router.get('/reserve', function(ctx) {
  ctx.body = 'reserve';
});

module.exports = router.routes();
