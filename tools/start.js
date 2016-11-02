/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import run from './run';
import copy from './copy';

const DEBUG = global.DEBUG;
const VERBOSE = global.VERBOSE;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
const bundler = webpack(webpackConfig);

async function start() {
  await run(copy);

  browserSync({
    port: global.PORT,
    ui: {
      port: global.PORT + 1,
    },
    server: {
      baseDir: './dist/',

      // http://webpack.github.io/docs/webpack-dev-middleware.html
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: VERBOSE,
            chunks: VERBOSE,
            children: VERBOSE,
            warnings: VERBOSE,
          },
        }),

        webpackHotMiddleware(bundler),
      ],
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'dist/**/*.css',
      'dist/**/*.html'
    ],
  });
}

export default start;
