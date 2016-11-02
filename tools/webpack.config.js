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

const argv = yargs.usage('Usage: npm start [options]')
  .example('npm start -- --port=3000 --release --cache --watch --verbose', 'html5-framework-example build')
  .alias('p', 'port')
  .default('p', 3000)
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


const PORT = argv.port;
const DEBUG = !argv.release;
const CACHE = argv.cache;
const WATCH = argv.watch;
const VERBOSE = argv.verbose;
global.PORT = PORT;
global.DEBUG = DEBUG;
global.CACHE = CACHE;
global.WATCH = WATCH;
global.VERBOSE = VERBOSE;

console.log('DEBUG:', DEBUG, ',CACHE:', CACHE, ',WATCH:', WATCH, ',VERBOSE:', VERBOSE, ',PORT:', PORT);

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
  module: [
    path.resolve(__dirname, '../src/index.js'),
  ],
};

if (!DEBUG) {
  entry['module'].push(
    // 'webpack-dev-server/client?http://localhost:8080',// Automatic Refresh: Inline mode
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
  );
}

const output = {
  path: path.resolve(__dirname, '../dist/'),
  filename: '[name].js',
  publicPath: '/', // Required for webpack-dev-server
  sourcePrefix: '',
  sourceMapFilename: '[name].js.map',
};

const jsLoader = DEBUG ? ['react-hot', 'babel-loader'] : ['babel-loader', WebpackStrip.loader('console.log', 'console.warn')];

const module = {
  // Load the react-hot-loader
  loaders: [{
    test: /\.jsx?$/,
    loaders: jsLoader,
    exclude: /node_modules/,
    include: [
      path.resolve(__dirname, '../src/'),
    ],
  }, {
    test: /\.json$/,
    loader: 'json-loader',
  }, {
    test: /\.txt$/,
    loader: 'raw-loader',
  }, {
    test: /\.(png|jpg|jpeg|gif)$/,
    loader: 'url-loader?limit=10000&name=public/[name].[hash].[ext]',
  }, {
    test: /\.(eot|ttf|wav|mp3|svg|woff|woff2)$/,
    loader: 'file-loader?name=public/[name].[hash].[ext]',
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
  }, ],
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

const plugins = [
  new webpack.optimize.CommonsChunkPlugin(
    'common.js'
  ),
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
  new webpack.BannerPlugin(
    pkg.name + ' v' + pkg.version +
    '\n\n@date ' + new Date().toString()
  )
];

const externals = [{
  react: 'React',
}, {
  'react-dom': 'ReactDOM',
}, {
  'html5_framework': 'html5_framework',
}];

const config = {
  entry,
  output,
  module,
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },
  // stats,
  // Require the webpack and react-hot-loader plugins
  plugins,
  externals,
  devtool: DEBUG ? 'source-map' : '', // 'inline-source-map' // 'cheap-module-eval-source-map',
  debug: DEBUG,
  cache: CACHE,
  // postcss: function plugin(bundler) {
  //   return [
  //     postcssImport({
  //       addDependencyTo: bundler,
  //     }),
  //     precss(),
  //     postcssMixins(),
  //     postcssNested(),
  //     postcssCssnext({
  //       autoprefixer: AUTOPREFIXER_BROWSERS,
  //     }),
  //   ];
  // },
};

export default config;
