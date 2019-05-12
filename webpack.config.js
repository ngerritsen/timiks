/* global require, __dirname, process, module */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createConfig = (env, argv) => {
  const config = {
    entry: {
      main: ['element-closest', path.join(__dirname, 'src/index.js')],
      scrambleWorker: path.join(__dirname, 'src/scrambleWorker.js')
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: false,
        hash: true
      })
    ]
  };

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.output.publicPath = '/';
  }

  return config;
};

module.exports = createConfig;
