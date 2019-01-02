import { message } from 'antd';
import { formatMessage } from 'umi/locale';
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
      message.success(formatMessage({ id: 'task.operation.create-task-success' }));
      yield put({ type: 'reload' });
    },

    *editTask({ id, payload }, { call, put }) {
      yield call(queryEditTask, id, payload);
      message.success(formatMessage({ id: 'task.operation.edit-task-success' }));
      yield put({ type: 'reload' });
    },

    *removeTask({ id }, { call, put }) {
      yield call(queryRemoveTask, id);
      message.success(formatMessage({ id: 'task.operation.delete-task-success' }));
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
