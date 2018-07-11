const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    //   mode:'development',
    //devtool: 'eval-source-map',
    entry: __dirname + '/app/main.js',//已多次提及的唯一入口文件
    output: {
        path: __dirname + '/build',//打包后的文件存放的地方
        filename: 'bundle-[hash].js'//打包后输出文件的文件名
    },
    devServer: {
        contentBase: __dirname,//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader'
                    //     presets: ["env", "react" ]//env 解析ES6; react解析react JSX
                    // }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'postcss-loader'
                    }
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }/*,
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({                   
                      fallback: "style-loader",                   
                      use: "css-loader"               
                }) 
            }*/
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new ExtractTextPlugin('style.css'),
        // new CleanWebpackPlugin('build/*.*', {
        //     root: __dirname,
        //     verbose: true,
        //     dry: false
        // })
    ]
}