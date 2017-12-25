/* eslint-disable */
const config = Object.assign({}, require('./webpack.common.config.js'));

config.devtool = 'eval-source-map';

config.module.rules.push({
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    }
  ]
});

module.exports = config; 
