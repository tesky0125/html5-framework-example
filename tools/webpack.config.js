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
import WebpackStrip from 'strip-loader';

const pkg = require(path.join(process.cwd(), 'package.json'));

const argv = yargs.usage('Usage: npm run build [options]')
  .example('npm run build --release --cache --watch --verbose', 'lubase build')
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

const DEBUG = !argv.release;
const CACHE = argv.cache;
const WATCH = argv.watch;
const VERBOSE = argv.verbose;
global.DEBUG = DEBUG;
global.CACHE = CACHE;
global.WATCH = WATCH;
global.VERBOSE = VERBOSE;

console.log('DEBUG:', DEBUG, ',CACHE:', CACHE, ',WATCH:', WATCH, ',VERBOSE:', VERBOSE);

const entry = {
  'libs/module': [path.resolve(__dirname, '../src/index.js')],
};

if (DEBUG) {
  entry['libs/module'].unshift('webpack-hot-middleware/client', 'webpack/hot/dev-server');
}

const output = {
  path: path.join(__dirname, '../dist/'),
  filename: '[name].js',
  publicPath: DEBUG ? '/' : 'https://static.cdn.com/module/',
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
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

const plugins = [
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
  new ExtractTextPlugin('styles/lubase.css'),
  new webpack.BannerPlugin(
    pkg.name + ' v' + pkg.version +
    '\n\n@date ' + new Date().toString()
  ),
];

const moduleConfig = {
  loaders: [{
    test: /\.jsx?$/,
    loaders: DEBUG ? ['react-hot', 'babel-loader'] : ['babel-loader', WebpackStrip.loader('console.log', 'console.warn')],
    exclude: /node_modules/,
  }, {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: 'url-loader?limit=10&name=images/[name].lubase.[ext]',
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
  }],
};

const stats = {
  colors: VERBOSE,
  reasons: DEBUG,
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
  devtool: DEBUG ? 'cheap-module-eval-source-map' : '',
  debug: DEBUG,
  cache: CACHE,
  resolve,
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
