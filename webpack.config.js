const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_SRC = path.resolve(__dirname, 'src');
const envBuild = process.env.NODE_ENV || 'develop';


module.exports = {
    entry: APP_SRC + '/js/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React App Setup',
            filename: 'index.html',
            template: APP_SRC + '/index.ejs',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            __ENV_BUILD__: JSON.stringify(envBuild)
        })
    ],
    resolve: {
        modules: [path.resolve(APP_SRC, 'js'), "node_modules"],
        alias: {
            config: path.resolve(APP_SRC, 'config.json')
        }
    }
}
