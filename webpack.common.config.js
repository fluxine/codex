/* eslint-disable */
if (! ['production', 'developpement'].includes(process.env.NODE_ENV)) {
  throw 'missing or invalid NODE_ENV var';
}

const path = require('path');
const externals = require('./webpack.externals.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const appConfig = require('./config.js');

module.exports = {
  entry: {
      codex: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: appConfig.appTitle,
      template: 'src/index.html',
      appConfig: JSON.stringify(appConfig),
    }),
    new HtmlWebpackExternalsPlugin({
      externals: externals,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'codex.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: './.babel.cache'
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};