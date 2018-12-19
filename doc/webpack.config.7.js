//基于node- commonjs规范
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
//webpack含有热加载
let webpack = require('webpack');
//抽离样式
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//分开抽离样式
let LessExtract = new ExtractTextWebpackPlugin('./css/less.css');
let CssExtract = new ExtractTextWebpackPlugin('./css/css.css');
//抽离样式---但是不能分开抽离--目前有些bug
let MiniCssTractPlugin = require('mini-css-tract-plugin'); 
//去掉不用的css,必须放在HtmlWebpackPlugin后面
let purifycssWebpack = require('purifycss-webpack');
let glob = require('glob');
//拷贝插件  复制文件  用于一些无法npm的第三方框架ui 但是需要在html模板中添加css框架
let copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', //入口
    output: {
        filename: '[name].[hash: 8].js', //多页
        path: path.resolve('./dist'), //解析成绝对路径
    },//出口
    plugins: [
        new MiniCssTractPlugin({
            filename: './css/index.css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        //先清空,在html打包
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',
            title: 'webpack构建',
            hash: true, //清缓存
        }), 
        new purifycssWebpack({
            paths: glob.sync(path.resolve('./src/*.html'))
        }),
        new copyWebpackPlugin([{
            from: './src/doc',
            to: 'public'
        }])
    ], //插件配置
    resolve: {}, //配置解析
    module: {
        rules: [ //解析从右向左
            {
                test:/\.css$/,
                use :MiniCssTractPlugin.extract({
                    use: [
                        {loader: 'css-loader'}
                    ]
                })
            },
            {
                test:/\.less$/,
                use :MiniCssTractPlugin.extract({
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
