module.exports = {
    devServer: {
        proxy: {
            ["/dev-api"]: {
                target: 'https://api.shop.eduwork.cn/',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + "/dev-api"]: ''
                }
            }
        }
    }

}