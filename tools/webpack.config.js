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

const pkg = require(path.join(process.cwd(), 'package.json'));

const argv = yargs.usage('Usage: npm run build [options]')
  .example('npm run build --release --cache --watch --verbose', 'html5-framework-example build')
  .alias('r', 'release')
  .default('r', false)
  .alias('c', 'cache')
  .default('c', false)
  .alias('w', 'watch')
  .default('w', false)
  .alias('v', 'verbose')
  .default('v', false)
  .help('h')
  .argv;

const DEBUG = global.DEBUG = !argv.release;
const CACHE = global.CACHE = argv.cache;
const WATCH = global.WATCH = argv.watch;
const VERBOSE = global.VERBOSE = argv.verbose;

console.log('DEBUG:', DEBUG, ',CACHE:', CACHE, ',WATCH:', WATCH, ',VERBOSE:', VERBOSE);

const extractTextPlugin = new ExtractTextPlugin('styles/module.css');

export default {
  entry: {
    'libs/module': DEBUG ? [path.resolve(__dirname, '../src/index.js'), 'webpack-hot-middleware/client', 'webpack/hot/dev-server'] : [path.resolve(__dirname, '../src/index.js')],
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name].js',
    publicPath: DEBUG ? '/' : 'https://static.cdn.com/module/',
    sourcePrefix: '',
    sourceMapFilename: '[name].js.map',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: DEBUG ? ['react-hot', 'babel-loader'] : ['babel-loader', 'strip-loader?strip[]=console.log,strip[]=console.info'],
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=10&name=images/[name].lubase.[ext]',
    }, {
      test: /\.css$/,
      loader: extractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
    }],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      __DEV__: DEBUG,
    }),
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
    extractTextPlugin,
    new webpack.BannerPlugin(
      pkg.name + ' v' + pkg.version +
      '\n\n@date ' + new Date().toString()
    ),
  ],
  externals: [{
    react: 'React',
  }, {
    'react-dom': 'ReactDOM',
  }, {
    'html5_framework': 'html5_framework',
  }],
  devtool: DEBUG ? 'cheap-module-eval-source-map' : '',
  debug: DEBUG,
  cache: CACHE,
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },
  stats: {
    colors: VERBOSE,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: VERBOSE,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: CACHE,
    cachedAssets: CACHE,
  },
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
