/* eslint-disable import/no-mutable-exports */
let API_HOST;

if (process.env.NODE_ENV === 'development') {
  API_HOST = 'http://10.32.16.99:8000';
} else if (process.env.NODE_ENV === 'production') {
  API_HOST = `http://${window.location.host}/`;
} else {
  API_HOST = 'http://unknown-env/';
}

const leakageStatus = ['未处理', '已处理', '白名单'];

const leakageTagColor = ['blue', '#666', 'green'];

const taskStatus = ['等待中', '运行中', '完成'];

export { API_HOST, leakageStatus, leakageTagColor, taskStatus };
