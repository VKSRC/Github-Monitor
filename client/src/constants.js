/* eslint-disable import/no-mutable-exports */
let API_HOST;

const { DEV, PROD } = window;

if (DEV) {
  // API_HOST = 'http://10.32.16.99:8000';
  API_HOST = `${window.location.origin}`;
} else if (PROD) {
  API_HOST = `${window.location.origin}`;
}

const leakageStatus = ['未处理', '已处理', '白名单'];

const leakageTagColor = ['blue', '#666', 'green'];

const taskStatus = ['等待中', '运行中', '完成'];

const matchMethod = ['模糊匹配', '精确匹配', '单词匹配'];

export { API_HOST, leakageStatus, leakageTagColor, taskStatus, matchMethod };
