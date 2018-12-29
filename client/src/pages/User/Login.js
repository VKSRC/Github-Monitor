import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage, formatMessage } from 'umi/locale';
import Login from '@/components/Login';
import { getAccountToken } from '@/utils/authority';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: values,
      }).then(() => {
        const token = getAccountToken();
        if (token) window.location.href = '/';
      });
    }
  };

  render() {
    const { submitting } = this.props;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey="account"
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <UserName
            name="username"
            placeholder={formatMessage({ id: 'login.field.username.placeholder' })}
          />
          <Password
            name="password"
            placeholder={formatMessage({ id: 'login.field.password.placeholder' })}
            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
          />
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
