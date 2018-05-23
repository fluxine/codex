/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge.strategy({ plugins: 'prepend' })(
  common, {
    devtool: 'source-map',
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                },
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          }),
        },
      ],
    },
  });
