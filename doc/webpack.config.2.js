//基于node- commonjs规范
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // entry: './src/index.js', //单页入口
    // entry: ['./src/index.js', './src/a.js'], //单页引入多个入口
    entry: {
        index: './src/index.js',
        a: './src/a.js'
    }, //多页,多入口和多出口
    output: {
        // filename: 'build.[hash: 8].js', //单页
        filename: '[name].[hash: 8].js', //多页
        path: path.resolve('./dist'), //解析成绝对路径
    },//出口
    module: {}, //模块配置
    plugins: [
        //先清空,在html打包
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',
            title: 'webpack构建',
            hash: true, //清缓存
            chunks: ['index'], //对应引入js
            // minify:{
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // }
        }), //多页引入
        new HtmlWebpackPlugin({
            filename: 'b.html',
            template: './src/index.html',
            title: 'webpack构建',
            hash: true, //清缓存
            chunks: ['a']
        })
    ], //插件配置
    resolve: {}, //配置解析
    devServer: {
        contentBase: './build',
        port: 3000,
        compress: true,  //服务器压缩
        open: true, //自动打开浏览器
        // hot: true
    }, //开发服务器
}
