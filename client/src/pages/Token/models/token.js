import { message } from 'antd';
import { queryTokenLists, queryCreateToken } from '@/services/github';

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

    *createToken({ payload }, { call, put }) {
      yield call(queryCreateToken, payload);
      message.success('添加Token成功!');
      yield put({ type: 'reload' });
    },

    *reload(action, { put, select }) {
      const { token } = yield select();
      const { page, pageSize } = token;
      yield put({
        type: 'fetchTokens',
        payload: {
          page,
          pageSize,
        },
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
