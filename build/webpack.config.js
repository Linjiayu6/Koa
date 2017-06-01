import webpack from 'webpack';
import path from 'path';
import _debug from 'debug';
const debug = _debug('webpack.config');

/*
  source-map:
  A full SourceMap is emitted as a separate file.
  It adds a reference comment to the bundle
  so development tools know where to find it
*/
const webpackConfig = {
  devtool: 'source-map',
  // resolve: {
  //   modules: [__dirname, 'node_modules'],
  //   alias: {
  //     index: path.resolve(__dirname, '../src/index'),
  //   },
  //   extensions: ['', '.js', '.jsx', '.json']
  // },
  module: {
    loaders: []
  }
}

/* ------ Loaders: js,jsx,json------*/
// webpackConfig.module.loaders = [{
//   test: /\.(js|jsx)$/,
//   exclude: /node_modules/,
//   loader: 'babel-loader',
//   options: {
//     cacheDirectory: true,
//     plugins: ['transform-runtime'],
//     presets: ['es2015', 'react', 'stage-0']
//   }
// },
//   {
//     test: /\.json$/,
//     loader: 'json'
//   }
// ];

webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    use: 'babel-loader',
    exclude: [/node_modules/],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
  },
];

export default webpackConfig;
