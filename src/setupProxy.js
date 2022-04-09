const { createProxyMiddleware } = require('http-proxy-middleware');
console.log("Print setupProxy.js")
module.exports = function (app) {
  app.use(
    '/api/avatar',
    createProxyMiddleware({
      target: 'http://api.multiavatar.com/500',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  );
};