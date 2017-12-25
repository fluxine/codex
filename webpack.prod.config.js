/* eslint-disable */
const config = Object.assign({}, require('./webpack.common.config.js'));

const ExtractTextPlugin = require('extract-text-webpack-plugin')

config.devtool = 'source-map';
config.plugins.unshift(new ExtractTextPlugin({
  filename: '[name].css'
}));

config.module.rules.push({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }
      ]
  })
});

module.exports = config; 
