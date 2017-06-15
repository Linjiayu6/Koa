const fs = require('fs');

// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
const files = fs.readdirSync(__dirname + '/controller');

const addRoutes = (mapping, router) => {
  for (let url in mapping) {
      // url是从GET开头的
      if (url.startsWith('GET')) {
        const path = url.substring(4);
        router.get(path, mapping[url]);
        console.log(`register URL mapping: GET ${path}`);
      } else if (url.startsWith('POST')) {
        const path = url.substring(5);
        router.get(path, mapping[url]);
        console.log(`register URL mapping: Post ${path}`);
      } else {
        console.log('无效的url');
      }
    }
}

const handleRoutes = (router) => {
  // 处理每个js文件
  for (let f of files) {
    console.log(`process controller: ${f}...`);
    // 当前这个问题
    let mapping = require(__dirname + '/controller/' + f);
    addRoutes(mapping, router);
  }
}

module.exports = () => {
  const router = require('koa-router')();
  handleRoutes(router);
  return router.routes();
};