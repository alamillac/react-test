const path = require('path');

const APP_SRC = path.resolve(__dirname, 'src');

const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        })
    ],
    resolve: {
        modules: [path.resolve(APP_SRC, 'js'), "node_modules"]
    }
}
