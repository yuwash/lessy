'use strict'
// This is the webpack config used for unit tests.

import * as utils from './utils';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import baseWebpackConfig from './webpack.base.conf.js';

const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: utils.styleLoaders()
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': import('../config/test.env')
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

export default webpackConfig
