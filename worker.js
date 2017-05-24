require('babel-polyfill');
const fs = require('fs');
const ejs = require('ejs');

/* webpack */
const webpack = require('webpack');
const makeDevMiddleware = require('webpack-dev-middleware');
const makeHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);
// HRM config
const devMiddleware = makeDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: 'minimal',
})
const hotMiddleware = makeHotMiddleware(compiler, {
  overlay: false,
  info: true,
  heartbeat: 10 * 2000,
})
/*---webpack end---*/

// html加载
// const optionsData = {
//   htmlWebpackPlugin: {
//     options: {
//       development: true
//     }
//   }
// }

// function handle(req, res) {
//   devMiddleware(req, res, () => {
//     hotMiddleware(req, res, () => {
//       res.setHeader('Content-Type', 'text/html')
//       const template = fs.readFileSync('src/index.html', 'utf8')
//       res.end(
//         ejs.render(template, optionsData, { _with: true })
//       )
//     })
//   })
// }

// createServer(handle).listen(port, () => {
//   process.stdout.write(`Dev server listening on port ${port}...\n`)
// })


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
app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(8080, () => {
  console.log('localhost:8080 is listening!')
});
