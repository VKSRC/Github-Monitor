import request from '@/utils/request';
import { API_HOST } from '@/constants';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/user/');
}

export async function queryLogin(payload) {
  return request(`${API_HOST}/api/login/`, {
    method: 'POST',
    body: payload,
  });
}
