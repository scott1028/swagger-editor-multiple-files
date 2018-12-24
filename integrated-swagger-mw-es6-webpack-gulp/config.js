'use strict';

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const apiConfig = {
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
    new webpack.HotModuleReplacementPlugin(),  // <-- BTW config.devServer.hot = { ... } if for devServer of webpack without 'webpack/hot/poll?1000' mixin
    new webpack.NamedModulesPlugin(),
  ],
};

// Ref: https://github.com/lorenwest/node-config/wiki/Environment-Variables
// This will detect ./config/*** folder, it's a nodejs mechanism
require('dotenv').config();
apiConfig.mode = process.env.MODE || apiConfig.mode;
if(apiConfig.mode === 'production') {
  apiConfig.watch = false;
  apiConfig.entry.dist.shift();
  delete apiConfig.plugins;
}

// Unresolved: multiple config will cause HMR incorrect.
module.exports = apiConfig;
