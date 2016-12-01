/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import Promise from 'bluebird';
import fs from './lib/fs';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  await fs.makeDir(path.resolve(__dirname, '../dist/libs'));
  await fs.makeDir(path.resolve(__dirname, '../dist/styles'));

  await Promise.all([
    ncp(path.resolve(__dirname, '../libs'), path.resolve(__dirname, '../dist/libs')),
    ncp(path.resolve(__dirname, '../../html5-framework/dist/libs/html5_framework.js'), path.resolve(__dirname, '../dist/libs/html5_framework.js')),
    ncp(path.resolve(__dirname, '../../html5-framework/dist/styles/html5_framework.css'), path.resolve(__dirname, '../dist/styles/html5_framework.css')),
    ncp('src/index.html', 'dist/index.html'),
  ]);
}

export default copy;
