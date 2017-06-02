import webpack from 'webpack';
import webpackConfig from './webpack.config';
import clone from 'clone';
import path from 'path';

const webpackConfigServer = clone(webpackConfig);

webpackConfigServer.name = 'server';
webpackConfigServer.target = 'node';

// 打包入口
webpackConfigServer.entry = [
  path.resolve(__dirname, '../server/serverRender.js'),
];

// bundle.js output
webpackConfigServer.output = {
  filename: 'server.js',
  path: path.resolve(__dirname, '../dist'),
  library: 'server',
  libraryTarget: 'umd',
  umdNamedDefine: true
}


// export default webpackConfigServer;
// server端启动

export default async function () {

  try {
      console.log('Compile server............');
      await compileServer();
    } catch (error) {
      return Promise.reject(error);
    }

  const serverlib = path.resolve(__dirname, '../dist/server.js');

  console.log(require(serverlib));

  return Promise.resolve(require(path.resolve(__dirname, '../dist/server.js')));
}

function compileServer () {
  return new Promise((resolve, reject) => {
    let compiler = webpack(webpackConfigServer);

    compiler.plugin('done', stats => {
      resolve(true);
    })

    compiler.run(function (err, stats) {
      if (err) {
        reject(err)
      }
    })
  })
}
