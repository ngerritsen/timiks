/* global require, __dirname, process, module */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildNumber = require('./src/static/build');

const createConfig = (env, argv) => {
  const config = {
    entry: {
      main: ['element-closest', path.join(__dirname, 'src/index.js')]
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
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        mode: argv.mode,
        template: './src/index.html',
        inject: true,
        buildNumber
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules|vendor/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          }
        }
      }
    }
  };

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.output.publicPath = '/';
    config.devServer = {
      historyApiFallback: true
    };
  }

  return config;
};

module.exports = createConfig;
