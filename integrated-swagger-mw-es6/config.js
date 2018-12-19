'use strict';

const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: {
    dist: './src/backend/app.es6.js',
  },
  output: {
    filename: 'app.[name].js',
    path: path.resolve(__dirname, 'src/backend'),
  },
  target: 'node',
  externals: [nodeExternals()],
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
};