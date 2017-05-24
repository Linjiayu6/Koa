const path = require('path')
const webpack = require('webpack')

const port = process.env.PORT || 3000

module.exports = {
  target: 'web',
  entry: {
    bundle: [
      'react-hot-loader/patch',
      './src/index.js',
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[hash].bundle.js',
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
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: module => module.context && module.context.includes('node_modules'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
