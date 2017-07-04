const webpack = require('webpack');

module.exports = {
  entry: "./game-of-life.js",
  output: {
    filename: "./bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  devtool: "cheap-eval-source-map"
}
