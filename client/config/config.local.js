export default {
  define: {
    'window.DEV': true,
  },
  proxy: {
    '/api': {
      target: 'http://10.32.16.99:8000/',
      changeOrigin: true,
    },
  },
};
