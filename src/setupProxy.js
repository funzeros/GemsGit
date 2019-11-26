// 引入中间件
const proxy = require('http-proxy-middleware');

module.exports = function(app){
    app.use(proxy(
        '/api',{
            target:'http://10.31.155.44:9001',
            // target:'http://192.168.1.102:9001',
            // target:'http://47.103.218.109:9001',
            changeOrigin:true
        }
    ));
}