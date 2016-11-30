const webpack = require('webpack');
const helpers = require('./helpers');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json'],
        modules: [helpers.root('src'), helpers.root('node_modules'), helpers.root('bower_components')],
        alias: {
            'jquery': helpers.root('bower_components/jquery/src/jquery')
        }
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)([\?]?.*)$/,
                loader: 'file?name=[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'to-string-loader!style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'to-string-loader!style-loader!css-loader!less-loader'
            },
            {
                test: /\.(sass|scss)$/,
                loader: 'to-string-loader!style-loader!css-loader!sass-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};