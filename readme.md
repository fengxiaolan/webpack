## webpack4.0+
- 初始化
```
npm init [-y]
```

- 全局安装
```
npm install  webpack -g (不建议)
```
- 本地安装(开发时候使用)
```
 npm install webpack webpack-cli -save-dev
 或者
 npm install webpack webpack-cli -D
```

## webpack中所有文件都是模块
- js模块 (AMD CMD ES6-module commonjs)

## 直接允许webpack
会执行node_module对应的bin下的webpack.cmd
```
npx webpack
```

## webpack 如何配置
```
npm install webpack-dev-server -D
```

## webpack插件 
- plugin  讲htmml打包到build下,自动引入
- loader 加载器去解析一个个模块

* css-loader(本身有热更新功能,但抽离的可能就没有啦)
* 抽离样式-抽离到一个css文件-通过css文件方式引用-link方式引用
```
npm install extract-text-webpack-plugin@next 
之后可能被mini-css-extract-plugin替换
```

去掉不用的css
- purifycss-webpack
- purify-css 
- glob

自动加前缀
- postcss-loader 
- autoprefixer

拷贝插件
- copy-webpack-plugin

提取单独打包css文件
- mini-css-extract-plugin

## 配置babel
- babel-loader实现对特定文件类型的处理
- babel-core的作用在于提供一系列api
- babel-preset-env的作用是告诉babel使用哪种转码规则进行文件处理