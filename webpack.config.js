/* global require, __dirname, process, module */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const buildNumber = require('./src/static/build');

const createConfig = (env, argv) => {
  const config = {
    entry: {
      main: ['element-closest', path.join(__dirname, 'src/index.js')],
      scrambleWorker: path.join(__dirname, 'src/scrambleWorker.js')
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: '[name].[chunkHash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loader: 'css-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        mode: argv.mode,
        template: './src/index.html',
        analytics: 'UA-39696629-4',
        inject: false,
        buildNumber
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
