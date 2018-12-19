'use strict';

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const config = {
  mode: 'development',  // `development|production`, such as minify output, etc, it will set to `process.env.NODE_ENV`
  entry: {
    dist: [
      'webpack/hot/poll?1000',  // HMR Hook, it's in `node_modules/webpack/hot/poll.js`
      './src/backend/index.es6.js',  // this is multiple entrypoint combined with gulp.src
    ],
  },
  output: {
    filename: 'app.[name].js',
    // path: path.resolve(__dirname, 'src/backend'),  // this is replaced by gulp
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',  // move lots of *.hot-update.js files to `.hot` folder
    hotUpdateMainFilename: '.hot/[hash].hot-update.json',  // move lots of *.hot-update.json files to `.hot` folder
  },
  target: 'node',
  externals: [
    nodeExternals({whitelist: ['webpack/hot/poll?1000']}),  // <-- because we need this module to mix in our entrypoint of dist.
  ],
  watch: true,  // for enable --watch for webpack for re-compile, also it can could be integrated with HMR to work smoothly below plugins.
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],   // <-- transpile using babel-preset-env default settings, such as convert `const` to `var` so on.
          }
        }
      },
      {
        test: /\.yaml$/,
        use: 'js-yaml-loader',
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),  // <-- make module.hot = { ... } in your entrypoint
    new webpack.NamedModulesPlugin(),
  ],
};

// Ref: https://github.com/lorenwest/node-config/wiki/Environment-Variables
// This will detect ./config/*** folder, it's a nodejs mechanism
require('dotenv').config();
config.mode = process.env.MODE || config.mode;
if(config.mode === 'production') {
  config.watch = false;
  config.entry.dist.shift();
  delete config.plugins;
}

module.exports = config;
