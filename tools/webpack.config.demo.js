/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import webpack from 'webpack';
import yargs from 'yargs';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const argv = yargs.usage('Usage: npm start [options]')
  .example('npm start -- --port=3000 --cache --verbose', 'html5-framework example build')
  .alias('p', 'port')
  .default('p', 3000)
  .alias('c', 'cache')
  .default('c', false)
  .alias('v', 'verbose')
  .default('v', false)
  .help('h')
  .argv;

const PORT = global.PORT = argv.port;
const CACHE = global.CACHE = argv.cache;
const VERBOSE = global.VERBOSE = argv.verbose;
global.DEBUG = true;

console.log('PORT:', PORT, ',CACHE:', CACHE, ',VERBOSE:', VERBOSE);

const extractTextPlugin = new ExtractTextPlugin('styles/demo.css');

export default {
  entry: {
    'libs/demo': ['webpack/hot/dev-server', 'webpack-hot-middleware/client', path.resolve(__dirname, '../src') + path.sep + 'index.js'],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
    sourcePrefix: '',
    sourceMapFilename: '[name].js.map',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, '../src'),
      ],
      loaders: ['react-hot', 'babel-loader'],
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=10&name=images/[name].[hash].[ext]',
    }, {
      test: /\.(eot|ttf|wav|mp3|svg|woff|woff2)$/,
      loader: 'file-loader?name=fonts/[name].[hash].[ext]',
    }, {
      test: /\.css$/,
      loader: extractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
    }],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    extractTextPlugin,
  ],
  externals: [{
    react: 'React',
  }, {
    'react-dom': 'ReactDOM',
  }, {
    'html5_framework': 'html5_framework',
  }],
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },
  stats: {
    colors: VERBOSE,
    reasons: VERBOSE,
    hash: VERBOSE,
    version: VERBOSE,
    timings: VERBOSE,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: CACHE,
    cachedAssets: CACHE,
  },
  debug: true,
  cache: CACHE,
  postcss: function plugin(bundler) {
    return [
      require('postcss-import')({
        addDependencyTo: bundler,
      }),
      require('precss')(),
      require('postcss-mixins')(),
      require('postcss-nested')(),
      require('postcss-cssnext')({
        autoprefixer: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 35',
          'Firefox >= 31',
          'Explorer >= 9',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 7.1',
        ],
      }),
    ];
  },
};
