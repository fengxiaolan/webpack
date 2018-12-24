console.log('启动环境',process.env.NODE_ENV);
let webpackConfig;

//获取环境命令,并去除首尾空格
const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"");

//根据环境变量引入相关配置
if (process.env.NODE_ENV === 'production') {
  webpackConfig = require(`./build/webpack.config.prod.js`);
} else {
  webpackConfig = require(`./build/webpack.config.dev.js`);
}
module.exports = webpackConfig;