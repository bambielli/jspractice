const webpack = require('webpack');

module.exports = {
  entry: ["./practice/main.js"],
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
