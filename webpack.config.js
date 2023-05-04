const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const buildNumber = require("./src/static/build");

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  entry: {
    main: path.join(__dirname, "src/index.tsx"),
  },
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].[chunkhash].js",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(?:t|j)sx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
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
