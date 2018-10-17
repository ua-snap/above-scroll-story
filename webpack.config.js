"use strict"

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.resolve(__dirname, 'app');
const dirAssets = path.resolve(__dirname, 'assets');

const appHtmlTitle = 'NASA ABOVE';

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        vendor: [
            'lodash'
        ],
        bundle: path.join(dirApp, 'index')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].bundle.js'
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ],
        alias: {
          '@': dirAssets,
          node_modules: dirNode,
          'images': path.join(dirAssets, 'images')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle
        }),
        new MiniCssExtractPlugin(),
        new StyleLintPlugin({
          context: path.join(dirAssets, 'styles')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [dirApp],
                options: {
                  formatter: require('eslint-friendly-formatter')
                }
            },
            {
              test: /\.ejs$/,
              loader: 'ejs-compiled-loader'
            },
            // BABEL
            {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    "babelrc": false,
                    "presets": [
                      [
                        "@babel/preset-env",
                        {
                          debug: true,
                          "useBuiltIns": "entry"
                        }
                      ]
                    ],
                    plugins: ["@babel/plugin-syntax-dynamic-import"]
                  }
                }
            },
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                          minimize: {
                            safe: true,
                          },
                          sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            autoprefixer: {
                                browsers: ["last 2 versions"]
                            },
                            plugins: () => [
                                autoprefixer
                            ]
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            include: [
                                dirAssets
                            ]
                        }
                    }
                ],
                include: [dirNode, dirAssets]
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
        ]
    }
};
