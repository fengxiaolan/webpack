
console.log('帅的发紫');
// let str = require('./a.js');
console.log("1+2+3");

document.getElementById('app').innerHTML = "webpack 配置成功";

if(module.hot) {
    module.hot.accept();
    // module.hot.accept('./a.js', function() {
    //     let str = require('./a.js');
    //     document.getElementById('app').innerHTML = str;
    // })
}