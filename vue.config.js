const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    devServer: {
        host: 'localhost',
        open: true, // 是否自动弹出浏览器
        port: 8080, // 修改默认端口
        proxy: {
            // 代理转发
            '/api': {
                target: 'http://localhost:3000',
                // ws:false,//是否开启websockes协议请求--即时通讯请求
                changeOrigin: true, // 本地是否开启代理
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})
