import { queryLeakageLists, queryUpdateLeakageStatus } from '@/services/github';
import { message } from 'antd';

export default {
  namespace: 'github',

  state: {
    page: 0,
    page_size: 10,
    status: 'a',
    results: [],
    total: 0,
  },

  effects: {
    // payload = { page, page_size, status }
    *fetchLeakageLists({ payload }, { call, put }) {
      const response = yield call(queryLeakageLists, payload);
      yield put({
        type: 'getLeakageLists',
        response,
        payload,
      });
    },

    *updateLeakageStatus({ payload }, { call, put }) {
      yield call(queryUpdateLeakageStatus, payload);
      message.success('操作成功!');
      yield put({ type: 'reload' });
    },

    *reload(action, { put, select }) {
      const { github } = yield select();
      const { page, pageSize, status } = github;
      yield put({
        type: 'fetchLeakageLists',
        payload: {
          page,
          pageSize,
          status,
        },
      });
    },
  },

  reducers: {
    getLeakageLists(state, action) {
      return {
        ...state,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        status: action.payload.status,
        results: action.response.results,
        total: action.response.count,
      };
    },
  },
};
