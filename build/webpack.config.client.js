/*
  1. helmet-webpack-plugin:
    simplifies creation of HTML files to serve your webpack bundles
    Both client and server can use the same react-helmet configuration
  2. clone
    deep cloning of objects
*/
import webpack from 'webpack';
import webpackConfig from './webpack.config';
// import HelmetWebpackPlugin from 'helmet-webpack-plugin';
import clone from 'clone';
import path from 'path';

import _debug from 'debug';
const debug = _debug('webpack.config.client');
debug('Create client configuration.');
const webpackConfigClient = clone(webpackConfig);

webpackConfigClient.name = 'client';
webpackConfigClient.target = 'web';

const configPath = {
  compiler_public_path: '/',
};

// 打包入口
/*
  react-hot-loader/patch
    React Hot Loader is a plugin for Webpack that
    allows instantaneous live refresh without losing state while editing React components.
    不会刷新页面，而是替代你修改的部分
*/

webpackConfigClient.entry = {
  bundle: [
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js'),
    `webpack-hot-middleware/client?path=${configPath.compiler_public_path}__webpack_hmr`,
  ],
  // http://foio.github.io/wepack-code-spliting/
  // vendor: [
  //   'babel-polyfill',
  //   'history',
  //   'react',
  //   'react-redux',
  //   'react-router',
  //   'react-router-redux',
  //   'redux'
  // ],

};

// 输出
webpackConfigClient.output = {
  filename: `[name].[hash].js`,
  publicPath: '/',
  path: path.resolve(__dirname, '../dist/public'),
}

// 在dev环境下
debug('Enable plugins for live development (HMR, NoErrors).')
webpackConfigClient.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
];

export default webpackConfigClient;
