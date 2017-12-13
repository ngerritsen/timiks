const path = require('path');
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
  }
}

if (process.env.NODE_ENV === 'production') {
  delete config.devtool;
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin()
  ];
} else {
  config.devtool = 'inline-source-map';
  config.output.publicPath = '/';
}

module.exports = config;
