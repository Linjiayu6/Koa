/* middlewares 

执行的顺序
1. 请求地址 /
2
3
3.1
3.2
2.1
2.2 耗时 2
1.1
*/

const authorizeUser = false;

const printReqUrl = async (ctx, next) => {
  console.log('1. 请求地址', ctx.request.url);
  /*
    如果把await 取消掉, 那么后面的异步函数都不能执行
    这种情况可以用到鉴权，如果没有鉴权就可以返回 登录鉴权
  */
  if (authorizeUser) {
    await next();
  } else {
    console.log('1.1 没有鉴权 ....');
  }
};

const printReqTime = async(ctx, next) => {
  const start = new Date().getTime();
  console.log('2');
  await next();
  console.log('2.1');
  const ms = new Date().getTime() - start; // 耗费时间
  console.log('2.2 耗时', ms);
};

const renderHTML = async (ctx, next) => {
  console.log('3');
  await next();
  console.log('3.1');
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>test123123</h1>';
  console.log('3.2');
}

module.exports = {
  printReqUrl,
  printReqTime,
  renderHTML,
};