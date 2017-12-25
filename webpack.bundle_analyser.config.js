/* eslint-disable */
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const dev = require('./webpack.dev.config.js');

module.exports = merge(dev, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
