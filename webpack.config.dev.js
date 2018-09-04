const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'eval',

    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },

    devServer: {
        host: '0.0.0.0',
        contentBase: [
          path.join(__dirname, 'app'),
          path.join(__dirname, 'assets'),
          path.join(__dirname, 'templates'),
          __dirname
        ],
        watchContentBase: true
    }

});
