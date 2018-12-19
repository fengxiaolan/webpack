//基于node- commonjs规范
let path = require('path'); ////定义绝对路径
let HtmlWebpackPlugin = require('html-webpack-plugin'); //html模板插件
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', //入口
    output: {
        filename: 'build.[hash: 8].js',
        path: path.resolve('./dist'), //解析成绝对路径
    },//出口
    module: {}, //模块配置
    plugins: [
         //先清空,在html打包
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'webpack构建',
            hash: true, //清缓存
            // minify:{
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // }
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
