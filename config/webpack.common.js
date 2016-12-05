const webpack = require('webpack');
const helpers = require('./helpers');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': helpers.root('src/polyfills.ts'),
        'vendor': helpers.root('src/vendor.ts'),
        'app': helpers.root('src/main.ts')
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
        modules: [helpers.root('src'), helpers.root('node_modules')],
        alias: {
            'jquery': helpers.root('node_modules/jquery/src/jquery')
        }
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|ico)([\?]?.*)$/,
                loader: 'file?name=assets/images/[name].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)([\?]?.*)$/,
                loader: 'file?name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css?sourceMap'])
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(['css','less'])
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css','sass'])
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new CopyWebpackPlugin([
            { from: helpers.root('src/assets/js'), to: 'assets/js' },
            { from: helpers.root('src/assets/images'), to: 'assets/images' },
            { from: helpers.root('src/assets/icon'), to: 'assets/icon' }
        ]),

        new HtmlWebpackPlugin({
            template: helpers.root('src/index.html')
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};