var helpers = require('./helpers');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['', '.ts', '.js']
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
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null'
            },
            {
                test: /\.css$/,
                loader: 'to-string-loader!raw'
            },
            {
                test: /\.less$/,
                loader: 'to-string-loader!raw'
            },
            {
                test: /\.(sass|scss)$/,
                loader: 'to-string-loader!raw'
            }
        ]
    }
}