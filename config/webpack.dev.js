const commonConfig = require('./webpack.common.js');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const helpers = require('./helpers');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'apiUrl': JSON.stringify('http://api.fastcard.vn')
            }
        })
    ],

    devServer: {
        host: HOST,
        port: PORT,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
});