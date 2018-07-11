const merge = require('webpack-merge')
const parts = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const lessConfig = [
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            modules: true,
            minimize: true,
            getLocalIdent: (context, localIdentName, localName, options) => {
                return `${context.resourcePath
                    .split(/\\|\//)
                    .slice(-2, -1)}-${localName}`
            }
        }
    },
    {
        loader: 'resolve-url-loader'
    },
    {
        loader: 'less-loader',
        options: {
            javascriptEnabled: true,
            sourceMap: true,
            modules: true
        }
    }
]

let config = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader'
                    }
                ],
            },
            {
                test: /\.less$/,
                use: lessConfig
            }
        ]
    }
}

module.exports = merge(parts, config)