/* eslint-disable */
// 该配置不生效,仅仅是为了让Webstorm识别@目录别名
module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
};
