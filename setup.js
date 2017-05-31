// koa app准备
import server from './server/index';

(async () => {
  // const port = 8080;
  // const host = config.server_host;

  let app = await server();

  console.log('compile.....');
  app.listen(8080);
  console.log('.......app.listen.....');

  console.log(`Server is now running at http://localhost:8080.`)
})();
