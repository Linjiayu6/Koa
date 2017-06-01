// koa app准备, client端打包
import server from './server/index';

(async () => {
  // TODO: 需要定义端口号
  // const port = 8080;
  // const host = config.server_host;
  
  // app一些中间件, webpack 打包
  let app = await server();

  app.listen(8080);
  console.log('Server is now running at http://localhost:8080.');
})();
