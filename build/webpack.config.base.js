const path = require('path'); //定义绝对路径
const htmlWebpackPlugin = require('html-webpack-plugin'); //html模板插件
const copyWebpackPlugin = require('copy-webpack-plugin'); //复制文件  用于一些无法npm的第三方框架ui 但是需要在html模板中添加css框架
const webpack = require('webpack'); //获取内置的webpack
var VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'), /*webpack打包的文件输出地址*/
		filename: '[name]-[chunkhash:6].js', //生产环境用  开发环境必须为hash
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.js$/, 
				use: [
					{loader: 'babel-loader?cacheDirectory=true'}, //编译es6
				],
				exclude: /node_modules/ //excluder排除怼node下的文件的匹配
			},
			{
				test:/\.css$/,
				use:  [
					{loader: 'style-loader'},
					{loader: 'css-loader'}
				]
			},
			{
				test: /\.html$/,
				use: ['html-loader?minimize=true'],
				exclude: /node_modules/ //excluder排除怼node下的文件的匹配
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:6].[ext]',
							outputPath: 'image/',
							limit: 4000,
							publicPath: '../image' // 所以是基于page文件夹进行相对定位 要设置publicPath绝对路径
						}
					},
					{
						loader: 'image-webpack-loader',
						//压缩图片
						options: {
							pngquant: {
								quality: '65-90',
								speed: 4
							},
						}
					}
				],
				exclude: /node_modules/ //excluder排除怼node下的文件的匹配
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader'
				// loader: 'url-loader',
				// options: {
				// 	limit: 10000,
				// 	name: '[name:6].[ext]',
				// 	outputPath: 'fonts/',
				// 	publicPath: '../fonts' //同理 所以是基于page文件夹进行相对定位 要设置publicPath绝对路径
				// },
				// exclude: /node_modules/ //excluder排除怼node下的文件的匹配
			}
		]
	},
	resolve: {
		extensions: ['.vue','.js','.css','.json'],
		alias:{
			'@': resolve('src'),
			'assets': resolve('src/assets'),
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	plugins: [
    new htmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			inject: true,
			minify: {
				removeComponents: true,
				collapseWhitespace: false,
				removeAttributeQuotes: true
			},
			title: 'webpack4 - test'
		}),
    //提取公用业务的代码 
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

		new webpack.optimize.RuntimeChunkPlugin({
			name: "manifest"
		}),

		new webpack.HashedModuleIdsPlugin(),//用于固定模块id 防止调整顺序对于id进行重新打包

		//提升作用域
		new webpack.optimize.ModuleConcatenationPlugin(),

		//复制文件
		new copyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../src/assets'),
				to: path.resolve(__dirname, '../dist/assets'),
				force: true,
				ignore: ['.*']
			}
		]),

		new VueLoaderPlugin()

	],

};
