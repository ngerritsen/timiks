const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const buildNumber = require("./src/static/build");

module.exports = {
  devServer: {
    historyApiFallback: true
  },
  entry: {
    main: ["element-closest", path.join(__dirname, "src/index.js")],
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      buildNumber,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules|vendor/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
        scrambles: {
          test: /src\/scrambles/,
          chunks: "initial",
          name: "scrambles",
          enforce: true,
        },
      },
    },
  },
};
