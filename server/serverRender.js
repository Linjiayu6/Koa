import React from 'react';
import { match } from 'react-router';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { syncHistoryWithStore } from 'react-router-redux';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';

import { renderHtmlLayout } from 'helmet-webpack-plugin'

import App from '../src/App';

const serverRender = () => {
  return async function(ctx, next) {
    // server去获取接口的数据
    const initialState = await router(ctx);
    // 在node环境下, 在内存中进行历史记录的存储, 路由改变的记录是放到内存中的
    const memoryHistory = createMemoryHistory(ctx.req.url);
    // 在server端同样穿件一个store
    const store = createStore(initialState, memoryHistory);
    /*
    // 业务代码中的路径
    const routes = require('./routes/index').default(store)
    */
    // 同步store和对应的history
    const history = syncHistoryWithStore(memoryHistory, store, {
      selectLocationState: (state) => state.router
    });

    match({ history, routes, location: ctx.req.url }, async (err, redirect, props ) => {
      let content = renderToString(
        <App
          history={history}
          routerKey={Math.random()}
          routes={routes}
          store={store}
          layout={layout} />
      );
      let body = <div key="body" dangerouslySetInnerHTML={{ __html: content }}></div>;
      ctx.status = 200;
      // ctx.body = renderHtmlLayout(head, [body, scripts]);
      ctx.body = '<div>12312313213</div>';
    });

  }
};

export default serverRender;
