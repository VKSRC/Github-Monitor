import {
  queryLeakageLists,
  queryUpdateLeakageStatus,
  queryTasksForFilter,
  queryIgnoreRepository,
} from '@/services/github';
import { formatMessage } from 'umi/locale';
import { message } from 'antd';

export default {
  namespace: 'github',

  state: {
    page: 0,
    page_size: 10,
    status: '0',
    task: '',
    results: [],
    tasks: [],
    total: 0,
  },

  effects: {
    // 获取泄漏项
    *fetchLeakageLists({ payload }, { call, put }) {
      const response = yield call(queryLeakageLists, payload);
      yield put({
        type: 'getLeakageLists',
        response,
        payload,
      });
    },

    // 修改泄漏项目的状态(处理/加白)
    *updateLeakageStatus({ payload }, { call, put }) {
      yield call(queryUpdateLeakageStatus, payload);
      message.success(formatMessage({ id: 'effects.operation-succeed' }));
      yield put({ type: 'reload' });
    },

    // 加白指定仓库发现的全部泄露代码
    *ignoreRepository({ payload }, { call, put }) {
      yield call(queryIgnoreRepository, payload);
      message.success(formatMessage({ id: 'effects.operation-succeed' }));
      yield put({ type: 'reload' });
    },

    // 筛选状态
    *filterStatus({ payload }, { put, select }) {
      const { github } = yield select();
      const { pageSize, task } = github;

      // 修改state状态
      yield put({
        type: 'filterWithStatus',
        status: payload.status,
        page: 1,
      });

      // 已筛选后的状态获取最新的泄漏项
      yield put({
        type: 'fetchLeakageLists',
        payload: {
          page: 1,
          pageSize,
          task,
          status: payload.status,
        },
      });
    },

    // 以任务筛选
    *filterTask({ payload }, { put, select }) {
      const { github } = yield select();
      const { page, pageSize, status } = github;

      yield put({
        type: 'filterWithTask',
        task: payload.task,
      });

      yield put({
        type: 'fetchLeakageLists',
        payload: {
          page,
          pageSize,
          task: payload.task,
          status,
        },
      });
    },

    // 获取任务列表用于筛选
    *fetchTasks(action, { call, put }) {
      const response = yield call(queryTasksForFilter);

      yield put({
        type: 'getTasksForFilter',
        response,
      });
    },

    // 翻页
    *changePage({ payload }, { put, select }) {
      const { github } = yield select();
      const { status, task } = github;

      yield put({
        type: 'changePageReducer',
        page: payload.page,
      });

      yield put({
        type: 'fetchLeakageLists',
        payload: {
          page: payload.page,
          task,
          status,
        },
      });
    },

    *reload(action, { put, select }) {
      const { github } = yield select();
      const { page, pageSize, status, task } = github;
      yield put({
        type: 'fetchLeakageLists',
        payload: {
          page,
          pageSize,
          status,
          task,
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
        task: action.payload.task,
      };
    },

    getTasksForFilter(state, action) {
      return {
        ...state,
        tasks: action.response,
      };
    },

    filterWithStatus(state, action) {
      return {
        ...state,
        status: action.status,
        page: action.page,
      };
    },

    filterWithTask(state, action) {
      return {
        ...state,
        task: action.task,
      };
    },

    changePageReducer(state, action) {
      return {
        ...state,
        page: action.page,
      };
    },
  },
};
