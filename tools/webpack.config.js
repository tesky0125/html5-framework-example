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

const argv = yargs.usage('Usage: npm start [options]')
  .example('npm start -- --port=3000 --release --verbose', 'html5-framework-example build')
  .alias('p', 'port')
  .default('p', 3000)
  .alias('r', 'release')
  .alias('v', 'verbose')
  .help('h')
  .argv;

const DEBUG = !argv.release;
const VERBOSE = argv.verbose;
global.PORT = argv.port;

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
    // 'webpack-dev-server/client?http://localhost:8080',// Automatic Refresh: Inline mode
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
    path.resolve(__dirname, '../src/index.js'),
  ],
};

const output = {
  path: path.resolve(__dirname, '../dist/'),
  filename: '[name].js',
  publicPath: '/', // Required for webpack-dev-server
  sourcePrefix: '',
  library: '[name]',
  libraryTarget: 'umd',
  sourceMapFilename: '[name].js.map',
};

const module = {
  // Load the react-hot-loader
  loaders: [{
    test: /\.jsx?$/,
    loaders: ['react-hot', 'babel-loader'],
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
    loader: 'style-loader!css-loader!postcss-loader',
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

const externals = [{
  react: 'React',
}, {
  'react-dom': 'ReactDOM',
}, {
  'html5-framework': 'html5-framework',
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
  devtool: '#inline-source-map', // 'cheap-module-eval-source-map',
  debug: true,
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
