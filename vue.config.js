module.exports = {
    devServer: {
        proxy: {
            '/rest': {
                target: 'http://177.71.229.178:8060/',
                changeOrigin: true
            }
        }
    }
}