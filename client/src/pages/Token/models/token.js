import { queryTokenLists } from '@/services/github';

export default {
  namespace: 'token',

  state: {
    page: 1,
    pageSize: 10,
    tokens: [],
    total: 0,
  },

  effects: {
    *fetchTokens({ payload }, { call, put }) {
      const response = yield call(queryTokenLists, payload);
      yield put({
        type: 'show',
        response,
        payload,
      });
    },
  },

  reducers: {
    show(state, action) {
      return {
        ...state,
        ...action.payload,
        tokens: action.response.results,
        total: action.response.count,
      };
    },
  },
};
