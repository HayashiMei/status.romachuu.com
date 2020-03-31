const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf.js');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  watch: true,
  devServer: {
    compress: true,
    historyApiFallback: true,
    noInfo: true,
    stats: {
      colors: true,
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
    contentBase: [path.join(__dirname, '../app')],
    watchContentBase: false,
    port: 23333,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
