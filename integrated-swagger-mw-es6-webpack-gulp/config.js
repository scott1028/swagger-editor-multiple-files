'use strict';

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const apiConfig = {
  mode: 'development',  // `development|production`, such as minify output, etc, it will set to `process.env.NODE_ENV`
  entry: {
    dist: [
      './src/backend/index.es6.js',  // this is multiple entrypoint combined with gulp.src
    ],
  },
  output: {
    filename: 'app.[name].js',
    // path: path.resolve(__dirname, 'src/backend'),  // this is replaced by gulp
  },
  target: 'node',
  externals: [
    nodeExternals({whitelist: ['webpack/hot/poll?1000']}),  // <-- because we need this module to mix in our entrypoint of dist.
  ],
  watch: false,  // for enable/disabled --watch for webpack for re-compile, also it can could be integrated with HMR to work smoothly below plugins.
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
};

// Ref: https://github.com/lorenwest/node-config/wiki/Environment-Variables
// This will detect ./config/*** folder, it's a nodejs mechanism
apiConfig.mode = process.env.NODE_ENV || apiConfig.NODE_ENV;
if(apiConfig.mode === 'development') {
  apiConfig.watch = true;
  apiConfig.entry.dist.unshift('webpack/hot/poll?1000');  // HMR Hook, it's in `node_modules/webpack/hot/poll.js`
  apiConfig.output = {
    ...apiConfig.output,
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',  // move lots of *.hot-update.js files to `.hot` folder
    hotUpdateMainFilename: '.hot/[hash].hot-update.json',  // move lots of *.hot-update.json files to `.hot` folder
  }
  apiConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),  // <-- BTW config.devServer.hot = { ... } if for devServer of webpack without 'webpack/hot/poll?1000' mixin
    new webpack.NamedModulesPlugin(),
    ...apiConfig.plugins,
  ];
  delete apiConfig.plugins;
}

// Unresolved: multiple config will cause HMR incorrect.
module.exports = apiConfig;
