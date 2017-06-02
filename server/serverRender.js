import React from 'react';
// react-router的match方法, 同步服务器端和客户端的路由
import { match } from 'react-router';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { createStore, combineReducers } from 'redux'

// server端render使用的方法
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// 同步store和history
import { syncHistoryWithStore } from 'react-router-redux';

// import { renderHtmlLayout } from 'helmet-webpack-plugin';

import createRoutes from '../src/routes';
import { routerReducer } from 'react-router-redux';

import App from '../src/App';
import { reducer } from '../src/biztone/reducer';

export const rootReducer = combineReducers({
  poi: reducer,
  routing: routerReducer,
});

module.exports = async (ctx) => {
    const reqUrl = ctx.req.url;
    
    console.log('reqUrl..... 请求地址 ......', reqUrl);
    const routes = createRoutes();
    
    // 在node环境下, 在内存中进行历史记录的存储, 路由改变的记录是放到内存中的
    const memoryHistory = createMemoryHistory(reqUrl);
    
    // 在store中 注册history(router)
    const initialState = rootReducer;
    const store = createStore(initialState, memoryHistory);

    // 在history(router)中注册store
    const history = syncHistoryWithStore(memoryHistory, store);

    // 路径match: 
    match({ history, routes, location: reqUrl }, async (err, redirect, renderProps ) => {
      if (err) {
        console.log(err);
        return;
      }

      if (redirect) {
        // 跳转
        return;
      }

      if (renderProps) {
        /* renderProps:  [ 'routes', 'params', 'location', 'components', 'history', 'router', 'matchContext' ] */

        // const AppContainer = ({ location }) => (<div>linjiayu{ JSON.stringify(location)}</div>);
        // let html = renderToString(<AppContainer { ...renderProps} />);
        // const el = React.createElement(App, { store, ...renderProps });
        const el = <App {... { store, history }} />
        const html = renderToString(el);
        // let body = <div key="body" dangerouslySetInnerHTML={{ __html: html }}></div>;
        ctx.status = 200;
        // ctx.body = renderHtmlLayout(head, [body, scripts]);
        ctx.body = `<h1>${html}</h1>`;
        return;
      }

      ctx.status = 404;
      ctx.body = 'Not Found...... 没有match到路径';
    });
  };
