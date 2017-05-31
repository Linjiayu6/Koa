const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

//配置及初始化Koa服务器
const createWebpackServer = () => {
  //调用webpack热加载模块及对应参数
  const webpackServer = new webpackDevServer(compiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      historyApiFallback: true,
      stats: {
        colors: true // 用颜色标识
      }
  });
  //调用开启端口用来测试和开发
  webpackServer.listen(3000 , function(err) {
    if (err) { console.log(err); }
    console.log('Listening at localhost: 3000');
  });
};

module.exports = createWebpackServer;
