const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy para auth-service (puerto 3001)
  // Las peticiones a /api/auth/* se redirigen a http://localhost:3001/api/*
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: {
        '^/api/auth': '/api', // Reescribe /api/auth/login a /api/login
      },
    })
  );

  // Proxy para game-catalog-service (puerto 3002)
  app.use(
    '/api/games',
    createProxyMiddleware({
      target: process.env.REACT_APP_GAME_CATALOG_SERVICE_URL || 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: {
        '^/api/games': '/api/games', // Mantiene la ruta
      },
    })
  );

  // Proxy para order-service (puerto 3003)
  app.use(
    '/api/orders',
    createProxyMiddleware({
      target: process.env.REACT_APP_ORDER_SERVICE_URL || 'http://localhost:3003',
      changeOrigin: true,
      pathRewrite: {
        '^/api/orders': '/api/orders', // Mantiene la ruta
      },
    })
  );

  // Proxy para library-service (puerto 3004)
  app.use(
    '/api/library',
    createProxyMiddleware({
      target: process.env.REACT_APP_LIBRARY_SERVICE_URL || 'http://localhost:3004',
      changeOrigin: true,
      pathRewrite: {
        '^/api/library': '/api/library', // Mantiene la ruta
      },
    })
  );

  // Proxy para contact-service (si existe, puerto 3005 o similar)
  app.use(
    '/api/contact',
    createProxyMiddleware({
      target: process.env.REACT_APP_CONTACT_SERVICE_URL || 'http://localhost:3005',
      changeOrigin: true,
      pathRewrite: {
        '^/api/contact': '/api/contact',
      },
    })
  );
};

