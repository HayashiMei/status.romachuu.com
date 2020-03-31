const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf.js');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[id].[chunkhash:8].js',
    publicPath: '/',
  },
  stats: {
    children: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
});
