const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000

module.exports = {
  entry: {
    bundle: [
      // 'react-hot-loader/patch',
      './src/index.js',
      'webpack-hot-middleware/client?reload=1',
      'webpack-dev-server/client?',
      'webpack/hot/only-dev-server',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    // filename: '[name].[hash].bundle.js',
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'server/template.html',
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      chunks: [
        'index', 'vendor', 'manifest'
      ],
      filename: 'template.html'
    }),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
  ],
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'common',
  //     minChunks: module => module.context && module.context.includes('node_modules'),
  //   }),
  // ],
}
