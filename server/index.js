if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'development';
}

const fs = require( 'fs' );
/* ------------ webpack ------------ */
// const webpack = require('webpack');
// const webpackMiddleware = require('koa-webpack-middleware');
// const devMiddleware = webpackMiddleware.devMiddleware;
// const hotMiddleware = webpackMiddleware.hotMiddleware;
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
// const webpackDevServer = require('./webpackDevServer');


/* ------------ webpack params------------ */
import webpack from 'webpack';
const webpackMiddleware = require('koa-webpack-middleware');
const devMiddleware = webpackMiddleware.devMiddleware;
const hotMiddleware = webpackMiddleware.hotMiddleware;

import webpackConfigClient from '../build/webpack.config.client';
const compiler = webpack(webpackConfigClient);

import webpackConfigServer from '../build/webpack.config.server';
// const serverCompiler = webpack(webpackConfigServer);

/* ------------ Koa ------------ */
const Koa = require('koa');
const logger = require('koa-logger');
const serve = require('koa-static2');

// 路由处理, api处理交给koa-router, 前端交给react-router处理
const router = require('./router');

/* ----------- koa app ------------ */
export default async() => {
  const app = new Koa();
  // koa的中间件
  app.use(logger());
  // app.use(serve('./public'));
  app.use(router);

  // 开发环境准备 Apply Webpack HMR Middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(devMiddleware(compiler, {
      noInfo: false,
      publicPath: webpackConfigClient.output.publicPath,
    }));
    app.use(hotMiddleware(compiler));
  }

  // let serverlib = await webpackConfigServer();
  // app.use(serverlib);

  return Promise.resolve(app);
}

// app.use( ctx => {
// 	ctx.type = 'html'
// 	ctx.body = fs.createReadStream( './server/template.html' );
// } )

// app.listen(8080, () => {
//   console.log('Koa server: localhost:8080 is listening!')
// });

// 如果是dev环境下
// webpackDevServer();
