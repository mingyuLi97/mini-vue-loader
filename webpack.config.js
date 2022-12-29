const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { VueLoaderPlugin } = require("vue-loader");
const { VueLoaderPlugin } = require("./vue-loader");
const webpack = require("webpack");
const path = require("path");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: path.resolve(__dirname, "vue-loader"),
        // loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
  ],
};
