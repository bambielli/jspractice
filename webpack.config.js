const webpack = require('webpack');

module.exports = {
  entry: ["babel-polyfill", "./practice/game-of-life.js"],
  output: {
    filename: "./practice/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ]
  },
  devtool: "source-map"
}
