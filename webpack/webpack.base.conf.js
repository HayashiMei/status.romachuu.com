const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const chalk = require('chalk');

const devMode = process.env.NODE_ENV !== 'production';

const cssLoaders = [devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'resolve-url-loader'];

const sassLoaderConfig = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    sassOptions: {
      includePaths: [path.resolve(__dirname, '../app/scss')],
    },
  },
};

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../app/src/main.js'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        loaders: cssLoaders,
      },
      {
        test: /\.(scss|sass)$/,
        loaders: [...cssLoaders, sassLoaderConfig],
      },
      {
        test: /\.(png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[sha512:hash:base64:7].[ext]',
              publicPath: '../images/',
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', 'json'],
    modules: ['node_modules', path.resolve(__dirname, '../app')],
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: devMode ? [] : ['console.info', 'console.log'],
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new ProgressBarPlugin({
      format: `  ${chalk.blue('build')} [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      summary: false,
      summaryContent: chalk.green('Build completed'),
    }),
    new VueLoaderPlugin(),
    new webpack.optimize.SplitChunksPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../app/index.html'),
      favicon: path.resolve('app/images/favicon.png'),
      chunksSortMode: 'auto',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[chunkhash:8].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[chunkhash:8].css',
      ignoreOrder: true,
    }),
  ],
};
