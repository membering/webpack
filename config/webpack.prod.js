const commonConfig = require('./webpack.common.js');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        filename: '[name].[hash].js',
        sourceMapFilename: '[name].[hash].map',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'apiUrl': JSON.stringify('http://api.fastcard.vn')
            }
        })
    ],

    htmlLoader: {
        minimize: false
    }
});