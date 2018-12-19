//基于node- commonjs规范
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
//webpack含有热加载//获取内置的webpack
let webpack = require('webpack'); 
//抽离样式
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//分开抽离样式
let LessExtract = new ExtractTextWebpackPlugin({
    filename: './css/less.css',
    disable: true,
}); //开发时候不生效,开发时候也使用style-loader
let CssExtract = new ExtractTextWebpackPlugin({
    filename: './css/css.css',
    disable: true,
});

module.exports = {
    mode: 'development',
    entry: './src/index.js', //入口
    output: {
        filename: '[name].[hash: 8].js', //多页
        path: path.resolve('./dist'), //解析成绝对路径
    },//出口
    plugins: [
        LessExtract,
        CssExtract,
        // new ExtractTextWebpackPlugin({
        //     filename: './css/index.css'
        // }), //抽离成一个文件
        new webpack.HotModuleReplacementPlugin(),
        //先清空,在html打包
        new CleanWebpackPlugin(['./build']),
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',
            title: 'webpack构建',
            hash: true, //清缓存
        }), 
        new webpack.optimize.SplitChunksPlugin({
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				//打包重复出现的代码
				vendor: {
					chunks: 'initial',
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0, // This is example is too small to create commons chunks
					name: 'vendor'
				},
				//打包第三方类库
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: Infinity
				}
			}
		}),
    ], //插件配置
    resolve: {}, //配置解析
    module: {
        rules: [ //解析从右向左
            {
                test:/\.css$/,
                use :CssExtract.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'postcss-loader'}
                    ]
                })
            },
            {
                test:/\.less$/,
                use :LessExtract.extract({
                    fallback: 'style-loader',
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
