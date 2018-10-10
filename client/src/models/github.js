import { queryLeakageLists } from '@/services/github';

export default {
  namespace: 'github',

  state: {
    page: 0,
    page_size: 10,
    results: [],
    total: 0,
  },

  effects: {
    // payload = { page, page_size }
    *fetchLeakageLists({ payload }, { call, put }) {
      const response = yield call(queryLeakageLists, payload);
      yield put({
        type: 'getLeakageLists',
        response,
        payload,
      });
    },
  },

  reducers: {
    getLeakageLists(state, action) {
      return {
        ...state,
        page: action.payload.page,
        page_size: action.payload.pageSize,
        results: action.response.results,
        total: action.response.count,
      };
    },
  },
};
