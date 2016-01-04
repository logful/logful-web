var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'app/index.js'),
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: 'http://127.0.0.1:3000/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', "stage-0", 'react']
                }
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.(png|jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
            /*
             {test: /\.woff$/, loader: 'file-loader?name=fonts/[name].[ext]'},
             {test: /\.eot$/, loader: 'file-loader?name=fonts/[name].[ext]'},
             {test: /\.woff2$/, loader: 'file-loader?name=fonts/[name].[ext]'},
             {test: /\.ttf$/, loader: 'file-loader?name=fonts/[name].[ext]'},
             {test: /\.svg$/, loader: 'file-loader?name=fonts/[name].[ext]'},
             */


            /*
             {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]"},
             {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]"},
             {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]"},
             {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]"},
             {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?name=fonts/[name].[ext]"}
             */
            /*
             {
             test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
             loader: 'url-loader?limit=10000'
             },
             */
            /*
             {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
             {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
             {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
             {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
             */
        ]
    },
    resolve: {
        modulesDirectories: ["node_modules", "app"],
        extensions: ['', '.js', '.json', '.jsx']
    },
    progress: true,
    devServer: {
        port: 3000,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('app.css'),
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, 'app/assets/favicon.ico'),
            template: path.resolve(__dirname, 'app/index.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ]
};