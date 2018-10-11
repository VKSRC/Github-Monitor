import { queryTaskLists } from '@/services/github';

export default {
  namespace: 'task',

  state: {
    page: 1,
    pageSize: 10,
    tasks: [],
    total: 0,
  },

  effects: {
    *fetchTasks({ payload }, { call, put }) {
      const response = yield call(queryTaskLists, payload);
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
        tasks: action.response.results,
        total: action.response.count,
      };
    },
  },
};
