const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
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
      hash: true
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  delete config.devtool;
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  config.devtool = 'inline-source-map';
  config.output.publicPath = '/';
}

module.exports = config;
