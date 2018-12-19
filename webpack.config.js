console.log('启动环境',process.env.NODE_ENV);

//获取环境命令,并去除首尾空格
const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"");

//根据环境变量引入相关配置
module.exports = require(`./build/webpack.config.${env}.js`);