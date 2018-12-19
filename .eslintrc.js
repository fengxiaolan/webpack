module.exports = {
  "env": {
    //环境定义了预定义的全局变量。更多在官网查看
    "browser": true,
    "node": true,
    "commonjs": true,
    "amd": true,
    "es6": true,
    "mocha": true
  },
  "parserOptions": {
    // ECMAScript 版本
    "ecmaVersion": 6,
    "sourceType": "module", //设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
    //想使用的额外的语言特性:
    "ecmaFeatures": {
        // 允许在全局作用域下使用 return 语句
        "globalReturn": true,
        // impliedStric
        "impliedStrict": true,
        // 启用 JSX
        "jsx": true,
        "modules": true
    }
  },
   /**
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  "rules": {
    // 禁止条件表达式中出现赋值操作符
    "no-cond-assign": 2,
    // 禁用 console
    "no-console": 0,
    // 禁止在条件中使用常量表达式
    "no-constant-condition": 2,
    // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
    "no-control-regex": 2,
  },
}