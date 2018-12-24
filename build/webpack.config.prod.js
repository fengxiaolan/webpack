// 引入基础配置
const path = require('path'); //定义绝对路径
const webpackBase = require("./webpack.config.base");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//加载分离css文件和js文件的插件
const webpackMerge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin'); //每次清楚dist文件的插件

module.exports = webpackMerge(webpackBase, {
	mode: "production",
	module: {},
	plugins: [
		/*每次进行打包的时候都把dist文件的内容进行清除*/
		new cleanWebpackPlugin(
			['dist'], //这里指每次清除dist文件夹的文件 匹配的文件夹
			{
				root: `${__dirname}/../`,//制定插件根目录位置 TODO 好恶心啊这种写法
				//verbose: true, //开启控制台输出
				dry: false//启用删除文件
			}
		),
		/*加载把css文件单独分离出来的插件*/
		//提取单独打包css文件
		new MiniCssExtractPlugin({
      filename: 'src.[name].css',
      chunkFilename: 'src.[contenthash:12].css'  
    }),
		new webpack.DefinePlugin({
      'process.env': require('./prod.env')
    }),
	],
});