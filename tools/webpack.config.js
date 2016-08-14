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

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 7.1',
];

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
};

const entry = {
  lib: [
    // 'webpack-dev-server/client?http://localhost:8080',// Automatic Refresh: Inline mode
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
    path.resolve(__dirname, '../src/index.js'),
    path.resolve(__dirname, '../test/index.js')
  ]
};

const output = {
  path: path.resolve(__dirname, '../build/public/'),
  filename: '[name].js',
  publicPath: '/public/' // Required for webpack-dev-server
};

const module = {
  // Load the react-hot-loader
  loaders: [{
    test: /\.jsx?$/,
    loaders: ['react-hot', 'babel-loader'],
    exclude: /node_modules/,
    include: [
      path.resolve(__dirname, '../'),
    ],
  }, {
    test: /\.json$/,
    loader: 'json-loader',
  }, {
    test: /\.txt$/,
    loader: 'raw-loader',
  }, {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: 'url-loader?limit=10000&name=[name].[hash].[ext]',
  }, {
    test: /\.(eot|ttf|wav|mp3|svg|woff|woff2)$/,
    loader: 'file-loader?name=[name].[hash].[ext]',
  }, {
    test: /\.css$/,
    loader: 'style-loader!css-loader!postcss-loader',
  }, ]
};

const stats = {
  colors: VERBOSE,
  reasons: DEBUG,
  hash: VERBOSE,
  version: VERBOSE,
  timings: VERBOSE,
  chunks: VERBOSE,
  chunkModules: VERBOSE,
  cached: VERBOSE,
  cachedAssets: VERBOSE,
};

const plugins = [
  // new webpack.optimize.CommonsChunkPlugin({
  //   names: ['libs/vendors'],
  //   filename: 'libs/vendors.js'
  // }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin(GLOBALS),
  ...(DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: VERBOSE,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),
  ...(DEBUG ? [
    new webpack.HotModuleReplacementPlugin(),
  ] : []),
  new webpack.NoErrorsPlugin(),
];

const config = {
  entry,
  output,
  module,
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
  stats,
  // Require the webpack and react-hot-loader plugins
  plugins,
  devtool: '#cheap-module-eval-source-map',
  debug: true,
  // postcss: function plugin(bundler) {
  //   return [
  //     require('postcss-import')({
  //       addDependencyTo: bundler,
  //     }),
  //     require('postcss-mixins')(),
  //     require('postcss-nested')(),
  //     require('postcss-cssnext')({
  //       autoprefixer: AUTOPREFIXER_BROWSERS,
  //     }),
  //     require('lost')({
  //       'gutter': '0px',
  //       'flexbox': 'no-flex',
  //       'cycle': 'none',
  //     }),
  //   ];
  // },
};

export default config;
