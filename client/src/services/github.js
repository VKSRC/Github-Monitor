import request from '@/utils/request';
import { API_HOST } from '../constants';

export async function queryLeakageLists({ page = 1, pageSize = 10, status = 'a', task = '' }) {
  let url = `${API_HOST}/api/monitor/result.json?page=${page}&page_size=${pageSize}`;

  if (status !== 'a') url += `&status=${status}`;

  if (task) url += `&task_id=${task}`;

  return request(url, {
    credentials: 'same-origin',
  });
}

export async function queryUpdateLeakageStatus({ id, status }) {
  return request(`${API_HOST}/api/monitor/result/${id}.json`, {
    method: 'PUT',
    body: {
      status,
    },
    credentials: 'same-origin',
  });
}

export async function queryIgnoreRepository({ id }) {
  return request(`${API_HOST}/api/monitor/result/${id}/ignore_repository/`, {
    method: 'PUT',
    credentials: 'same-origin',
  });
}

export async function queryTaskLists({ page = 1, pageSize = 10 }) {
  const url = `${API_HOST}/api/monitor/task.json?page=${page}&page_size=${pageSize}`;

  return request(url, {
    credentials: 'same-origin',
  });
}

export async function queryCreateTask(payload) {
  const url = `${API_HOST}/api/monitor/task.json`;

  return request(url, {
    method: 'POST',
    body: payload,
    credentials: 'same-origin',
  });
}

export async function queryEditTask(id, payload) {
  const url = `${API_HOST}/api/monitor/task/${id}.json`;

  return request(url, {
    method: 'PUT',
    body: payload,
    credentials: 'same-origin',
  });
}

export async function queryRemoveTask(id) {
  const url = `${API_HOST}/api/monitor/task/${id}.json`;

  return request(url, {
    method: 'DELETE',
    credentials: 'same-origin',
  });
}

export async function queryTasksForFilter() {
  const url = `${API_HOST}/api/monitor/task/get_basics.json`;

  return request(url, {
    credentials: 'same-origin',
  });
}

export async function queryTokenLists({ page = 1, pageSize = 10 }) {
  const url = `${API_HOST}/api/monitor/token.json?page=${page}&page_size=${pageSize}`;

  return request(url, {
    credentials: 'same-origin',
  });
}

export async function queryCreateToken(payload) {
  const url = `${API_HOST}/api/monitor/token.json`;

  return request(url, {
    method: 'POST',
    body: payload,
    credentials: 'same-origin',
  });
}
