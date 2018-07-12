const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {resolve} = require('path')

module.exports = {
    cache: true,

    context: resolve(__dirname),

    entry: __dirname + '/app/main.js',//已多次提及的唯一入口文件

    output: {
        path: __dirname + '/build',//打包后的文件存放的地方
        filename: 'bundle-[hash].js'//打包后输出文件的文件名
    },

    // devServer: {
    //     contentBase: __dirname,//本地服务器所加载的页面所在的目录
    //     historyApiFallback: true,//不跳转
    //     inline: true,//实时刷新
    //     hot: true
    // },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png',
                            limit: 25000
                        }
                    }
                ]
            }
        ]
    },

    // 配置对入口的解析过程
    resolve: {
        // 配置 webpack 的查找路径
        modules: ['src', 'node_modules'],
        // 调整 webpack 尝试匹配的文件扩展名
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.scss',
            '.less',
            '.css',
            '.png',
            '.jpg',
            '.gif'
        ]
    },

    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}
