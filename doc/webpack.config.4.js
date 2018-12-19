//基于node- commonjs规范
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
//webpack含有热加载
let webpack = require('webpack');
//抽离样式
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', //入口
    output: {
        filename: '[name].[hash: 8].js', //多页
        path: path.resolve('./dist'), //解析成绝对路径
    },//出口
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: './css/index.css'
        }), //抽离成一个文件
        new webpack.HotModuleReplacementPlugin(),
        //先清空,在html打包
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',
            title: 'webpack构建',
            hash: true, //清缓存
        }), 
    ], //插件配置
    resolve: {}, //配置解析
    module: {
        rules: [ //解析从右向左
            {
                test:/\.css$/,
                use :ExtractTextWebpackPlugin.extract({
                    use: [
                        {loader: 'css-loader'}
                    ]
                })
            },
            {
                test:/\.less$/,
                use :ExtractTextWebpackPlugin.extract({
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'less-loader'}
                    ]
                })
            }
        ]
    }, //模块配置
    devServer: {
        contentBase: './build',
        port: 3000,
        compress: true,  //服务器压缩
        open: true, //自动打开浏览器
        hot: true
    }, //开发服务器
}
