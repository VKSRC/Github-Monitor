import { routerRedux } from 'dva/router';
import { formatMessage } from 'umi/locale';
import { stringify } from 'qs';
import { reloadAuthorized } from '@/utils/Authorized';
import { queryLogin } from '@/services/user';
import { message } from 'antd';
import { setAuthority, setAccountToken } from '@/utils/authority';

export default {
  namespace: 'login',

  state: {
    status: false,
    token: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(queryLogin, payload);

      if (response.status === 400) {
        message.error(formatMessage({ id: 'login.error' }));
      }

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.token) {
        setAccountToken(payload.token);
        setAuthority('admin');
      } else {
        setAccountToken('');
        setAuthority('guest');
      }

      return {
        ...state,
        token: payload.token,
        status: true,
      };
    },
  },
};
