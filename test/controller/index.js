const login = async (ctx, next) => {
  ctx.response.body = `
    <form action="/loginsuccess" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
    </form>
  `;
};

const loginSuccess = async (ctx, next) => {
  ctx.response.body = `${JSON.stringify(ctx.request.body)}`;
};

module.exports = {
  'GET /login': login,
  'POST /loginsuccess': loginSuccess,
};