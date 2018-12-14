import { message } from 'antd';
import { queryTaskLists, queryCreateTask, queryEditTask, queryRemoveTask } from '@/services/github';

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

    *createTasks({ payload }, { call, put }) {
      yield call(queryCreateTask, payload);
      message.success('添加任务成功!');
      yield put({ type: 'reload' });
    },

    *editTask({ id, payload }, { call, put }) {
      yield call(queryEditTask, id, payload);
      message.success('修改任务成功!');
      yield put({ type: 'reload' });
    },

    *removeTask({ id }, { call, put }) {
      yield call(queryRemoveTask, id);
      message.success('删除任务成功!');
      yield put({ type: 'reload' });
    },

    *reload(action, { put, select }) {
      const { task } = yield select();
      const { page, pageSize } = task;
      yield put({
        type: 'fetchTasks',
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
        tasks: action.response.results,
        total: action.response.count,
      };
    },
  },
};
