require('babel-polyfill');
if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

const fs = require( 'fs' );
/* ------------ webpack ------------ */
// const webpack = require('webpack');
// // const webpackMiddleware = require('koa-webpack-middleware');
// // const devMiddleware = webpackMiddleware.devMiddleware;
// // const hotMiddleware = webpackMiddleware.hotMiddleware;
//
// const webpackDevServer = require('webpack-dev-server');
// const webpackConfig = require('./webpack.config');
// const compiler = webpack(webpackConfig);
//
// //配置及初始化Koa服务器
// const creatServer = () => {
//   //调用webpack热加载模块及对应参数
//   const app = new webpackDevServer(compiler, {
//       publicPath: webpackConfig.output.publicPath,
//       hot: true,
//       historyApiFallback: true,
//       stats: {
//         colors: true // 用颜色标识
//       }
//   });
//   //调用开启端口用来测试和开发
//   app.listen(3000 , function(err) {
//     if (err) { console.log(err); }
//     console.log('Listening at localhost: 3000');
//   });
// };
// creatServer();


const webpackDevServer = require('./webpackDevServer');


/* ------------启动 Koa Server------------ */
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const serve = require('koa-static2');

// 路由处理, api处理交给koa-router, 前端交给react-router处理
const router = require('./server/router');
// koa的中间件
app.use(logger());
app.use(serve('./public'));
// app.use(router);
// app.use(devMiddleware(compiler, {
// 	noInfo: false,
// 	publicPath: webpackConfig.output.publicPath,
// }));
// app.use(hotMiddleware(compiler));

// app.use( ctx => {
// 	ctx.type = 'html'
// 	ctx.body = fs.createReadStream( './server/template.html' );
// } )

app.listen(8080, () => {
  console.log('Koa server: localhost:8080 is listening!')
});

// 如果是dev环境下
webpackDevServer();
