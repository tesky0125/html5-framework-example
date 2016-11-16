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

const PORT = argv.port;
const CACHE = argv.cache;
const VERBOSE = argv.verbose;
global.DEBUG = true;
global.PORT = PORT;
global.CACHE = CACHE;
global.VERBOSE = VERBOSE;

console.log('CACHE:', CACHE, ',VERBOSE:', VERBOSE);

const entry = {
  'libs/demo': ['webpack/hot/dev-server', 'webpack-hot-middleware/client', path.resolve(__dirname, '../src') + path.sep + 'index.js'],
};

const output = {
  path: path.join(__dirname, '../dist'),
  filename: '[name].js',
  publicPath: '/',
  sourcePrefix: '',
  sourceMapFilename: '[name].js.map',
};

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
  'process.env.NODE_ENV': '"development"',
  __DEV__: true,
};

const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin(GLOBALS),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('styles/demo.css'),
];

const moduleConfig = {
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
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
  }],
};

const stats = {
  colors: VERBOSE,
  reasons: VERBOSE,
  hash: VERBOSE,
  version: VERBOSE,
  timings: VERBOSE,
  chunks: VERBOSE,
  chunkModules: VERBOSE,
  cached: CACHE,
  cachedAssets: CACHE,
};

const resolve = {
  extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
};

const externals = [{
  react: 'React',
}, {
  'react-dom': 'ReactDOM',
}, {
  'core': 'libs/core',
}, {
  'components': 'libs/components',
}];

const config = {
  entry,
  output,
  stats,
  module: moduleConfig,
  plugins,
  externals,
  devtool: 'cheap-module-eval-source-map',
  resolve,
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
        autoprefixer: AUTOPREFIXER_BROWSERS,
      }),
    ];
  },
};

export default config;
