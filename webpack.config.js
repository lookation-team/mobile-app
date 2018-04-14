var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

if (!process.env.LOOKATION_API_PATH) {
    throw '====>   Please define LOOKATION_API_PATH. \n\n ====>    Ex: export LOOKATION_API_PATH=localhost:3333'
}

module.exports = {
    devtool: 'eval-source-map',
    context: __dirname,
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js'
    },

    devServer: {
        colors: true,
        historyApiFallback: true,
        inline: true,
        port: 8000,
        host: '127.0.0.1',
        hot: true
    },

    module: {
        preLoaders: [
            { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg|png|gif|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.styl$/,
                loader: 'style!css!postcss!stylus?paths=node_modules'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    'presets': ['es2015', 'react'],
                    'plugins': ['react-hot-loader/babel']
                },
                exclude: path.join(__dirname, 'node_modules')
            }
        ]
    },

    eslint: {
        failOnWarning: false,
        failOnError: true
    },

    postcss: function() {
    return [autoprefixer];
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'LOOKATION_API_PATH': JSON.stringify(process.env.LOOKATION_API_PATH)
            }
        })
    ]
};
