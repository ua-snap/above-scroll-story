const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(webpackConfig, {

    mode: 'production',
    devtool: 'source-map',

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
          {
            from: 'assets/images',
            to: 'images',
            ignore: ['.*']
          }
        ])
    ]

});
