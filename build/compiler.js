import webpack from 'webpack';
import webpackConfigClient from './webpack.config.client.js';
// import webpackConfigServer from './webpack.config.server.js';

const webpackCompiler = (webpackConfig) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.run((err, status) => {

      const jsonSt = status.toJson();
      if (err) {
        return reject(err);
      } else if (jsonSt.errors.length > 0 ) {
        console.log(jsonSt.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonSt.warnings.length > 0) {
        console.log('warnings:', jsonSt.warnings.join('\n'));
      } else {
        console.log('webpack compile success......');
      }

      resolve(jsonSt);
    });
  });
};

export default webpackCompiler;

webpackCompiler(webpackConfigClient);
// webpackCompiler(webpackConfigServer);