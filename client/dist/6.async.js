(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [6],
  {
    '5WY0': function(e, t, a) {
      e.exports = {
        main: 'antd-pro-pages-user-register-main',
        getCaptcha: 'antd-pro-pages-user-register-getCaptcha',
        submit: 'antd-pro-pages-user-register-submit',
        login: 'antd-pro-pages-user-register-login',
        error: 'antd-pro-pages-user-register-error',
        success: 'antd-pro-pages-user-register-success',
        warning: 'antd-pro-pages-user-register-warning',
        'progress-pass': 'antd-pro-pages-user-register-progress-pass',
        progress: 'antd-pro-pages-user-register-progress',
      };
    },
    cq3J: function(e, t, a) {
      'use strict';
      var r = a('TqRt'),
        s = a('284h');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('14J3');
      var l = r(a('BMrR'));
      a('+L6B');
      var i = r(a('2/Rp'));
      a('jCWc');
      var d = r(a('kPKH'));
      a('Q9mQ');
      var o = r(a('diRs'));
      a('MXD1');
      var n = r(a('CFYs')),
        u = r(a('MVZn'));
      a('5NDa');
      var m = r(a('5rEg'));
      a('OaEy');
      var p = r(a('2fM7'));
      a('y8nQ');
      var c,
        f,
        g,
        h,
        v = r(a('Vl3Y')),
        E = s(a('q1tI')),
        w = a('MuoO'),
        M = a('LLXN'),
        b = r(a('mOP9')),
        y = r(a('usdK')),
        F = r(a('5WY0')),
        P = v.default.Item,
        S = p.default.Option,
        k = m.default.Group,
        C = {
          ok: E.default.createElement(
            'div',
            { className: F.default.success },
            E.default.createElement(M.FormattedMessage, {
              id: 'validation.password.strength.strong',
            })
          ),
          pass: E.default.createElement(
            'div',
            { className: F.default.warning },
            E.default.createElement(M.FormattedMessage, {
              id: 'validation.password.strength.medium',
            })
          ),
          poor: E.default.createElement(
            'div',
            { className: F.default.error },
            E.default.createElement(M.FormattedMessage, {
              id: 'validation.password.strength.short',
            })
          ),
        },
        q = { ok: 'success', pass: 'normal', poor: 'exception' },
        x = ((c = (0, w.connect)(e => {
          var t = e.register,
            a = e.loading;
          return { register: t, submitting: a.effects['register/submit'] };
        })),
        (f = v.default.create()),
        c(
          (g =
            f(
              ((h = class extends E.Component {
                constructor() {
                  super(...arguments),
                    (this.state = {
                      count: 0,
                      confirmDirty: !1,
                      visible: !1,
                      help: '',
                      prefix: '86',
                    }),
                    (this.onGetCaptcha = () => {
                      var e = 59;
                      this.setState({ count: e }),
                        (this.interval = setInterval(() => {
                          (e -= 1),
                            this.setState({ count: e }),
                            0 === e && clearInterval(this.interval);
                        }, 1e3));
                    }),
                    (this.getPasswordStatus = () => {
                      var e = this.props.form,
                        t = e.getFieldValue('password');
                      return t && t.length > 9 ? 'ok' : t && t.length > 5 ? 'pass' : 'poor';
                    }),
                    (this.handleSubmit = e => {
                      e.preventDefault();
                      var t = this.props,
                        a = t.form,
                        r = t.dispatch;
                      a.validateFields({ force: !0 }, (e, t) => {
                        if (!e) {
                          var a = this.state.prefix;
                          r({
                            type: 'register/submit',
                            payload: (0, u.default)({}, t, { prefix: a }),
                          });
                        }
                      });
                    }),
                    (this.handleConfirmBlur = e => {
                      var t = e.target.value,
                        a = this.state.confirmDirty;
                      this.setState({ confirmDirty: a || !!t });
                    }),
                    (this.checkConfirm = (e, t, a) => {
                      var r = this.props.form;
                      t && t !== r.getFieldValue('password')
                        ? a((0, M.formatMessage)({ id: 'validation.password.twice' }))
                        : a();
                    }),
                    (this.checkPassword = (e, t, a) => {
                      var r = this.state,
                        s = r.visible,
                        l = r.confirmDirty;
                      if (t)
                        if (
                          (this.setState({ help: '' }),
                          s || this.setState({ visible: !!t }),
                          t.length < 6)
                        )
                          a('error');
                        else {
                          var i = this.props.form;
                          t && l && i.validateFields(['confirm'], { force: !0 }), a();
                        }
                      else
                        this.setState({
                          help: (0, M.formatMessage)({ id: 'validation.password.required' }),
                          visible: !!t,
                        }),
                          a('error');
                    }),
                    (this.changePrefix = e => {
                      this.setState({ prefix: e });
                    }),
                    (this.renderPasswordProgress = () => {
                      var e = this.props.form,
                        t = e.getFieldValue('password'),
                        a = this.getPasswordStatus();
                      return t && t.length
                        ? E.default.createElement(
                            'div',
                            { className: F.default[`progress-${a}`] },
                            E.default.createElement(n.default, {
                              status: q[a],
                              className: F.default.progress,
                              strokeWidth: 6,
                              percent: 10 * t.length > 100 ? 100 : 10 * t.length,
                              showInfo: !1,
                            })
                          )
                        : null;
                    });
                }
                componentDidUpdate() {
                  var e = this.props,
                    t = e.form,
                    a = e.register,
                    r = t.getFieldValue('mail');
                  'ok' === a.status &&
                    y.default.push({ pathname: '/user/register-result', state: { account: r } });
                }
                componentWillUnmount() {
                  clearInterval(this.interval);
                }
                render() {
                  var e = this.props,
                    t = e.form,
                    a = e.submitting,
                    r = t.getFieldDecorator,
                    s = this.state,
                    n = s.count,
                    u = s.prefix,
                    c = s.help,
                    f = s.visible;
                  return E.default.createElement(
                    'div',
                    { className: F.default.main },
                    E.default.createElement(
                      'h3',
                      null,
                      E.default.createElement(M.FormattedMessage, { id: 'app.register.register' })
                    ),
                    E.default.createElement(
                      v.default,
                      { onSubmit: this.handleSubmit },
                      E.default.createElement(
                        P,
                        null,
                        r('mail', {
                          rules: [
                            {
                              required: !0,
                              message: (0, M.formatMessage)({ id: 'validation.email.required' }),
                            },
                            {
                              type: 'email',
                              message: (0, M.formatMessage)({
                                id: 'validation.email.wrong-format',
                              }),
                            },
                          ],
                        })(
                          E.default.createElement(m.default, {
                            size: 'large',
                            placeholder: (0, M.formatMessage)({ id: 'form.email.placeholder' }),
                          })
                        )
                      ),
                      E.default.createElement(
                        P,
                        { help: c },
                        E.default.createElement(
                          o.default,
                          {
                            content: E.default.createElement(
                              'div',
                              { style: { padding: '4px 0' } },
                              C[this.getPasswordStatus()],
                              this.renderPasswordProgress(),
                              E.default.createElement(
                                'div',
                                { style: { marginTop: 10 } },
                                E.default.createElement(M.FormattedMessage, {
                                  id: 'validation.password.strength.msg',
                                })
                              )
                            ),
                            overlayStyle: { width: 240 },
                            placement: 'right',
                            visible: f,
                          },
                          r('password', { rules: [{ validator: this.checkPassword }] })(
                            E.default.createElement(m.default, {
                              size: 'large',
                              type: 'password',
                              placeholder: (0, M.formatMessage)({
                                id: 'form.password.placeholder',
                              }),
                            })
                          )
                        )
                      ),
                      E.default.createElement(
                        P,
                        null,
                        r('confirm', {
                          rules: [
                            {
                              required: !0,
                              message: (0, M.formatMessage)({
                                id: 'validation.confirm-password.required',
                              }),
                            },
                            { validator: this.checkConfirm },
                          ],
                        })(
                          E.default.createElement(m.default, {
                            size: 'large',
                            type: 'password',
                            placeholder: (0, M.formatMessage)({
                              id: 'form.confirm-password.placeholder',
                            }),
                          })
                        )
                      ),
                      E.default.createElement(
                        P,
                        null,
                        E.default.createElement(
                          k,
                          { compact: !0 },
                          E.default.createElement(
                            p.default,
                            {
                              size: 'large',
                              value: u,
                              onChange: this.changePrefix,
                              style: { width: '20%' },
                            },
                            E.default.createElement(S, { value: '86' }, '+86'),
                            E.default.createElement(S, { value: '87' }, '+87')
                          ),
                          r('mobile', {
                            rules: [
                              {
                                required: !0,
                                message: (0, M.formatMessage)({
                                  id: 'validation.phone-number.required',
                                }),
                              },
                              {
                                pattern: /^\d{10}$/,
                                message: (0, M.formatMessage)({
                                  id: 'validation.phone-number.wrong-format',
                                }),
                              },
                            ],
                          })(
                            E.default.createElement(m.default, {
                              size: 'large',
                              style: { width: '80%' },
                              placeholder: (0, M.formatMessage)({
                                id: 'form.phone-number.placeholder',
                              }),
                            })
                          )
                        )
                      ),
                      E.default.createElement(
                        P,
                        null,
                        E.default.createElement(
                          l.default,
                          { gutter: 8 },
                          E.default.createElement(
                            d.default,
                            { span: 16 },
                            r('captcha', {
                              rules: [
                                {
                                  required: !0,
                                  message: (0, M.formatMessage)({
                                    id: 'validation.verification-code.required',
                                  }),
                                },
                              ],
                            })(
                              E.default.createElement(m.default, {
                                size: 'large',
                                placeholder: (0, M.formatMessage)({
                                  id: 'form.verification-code.placeholder',
                                }),
                              })
                            )
                          ),
                          E.default.createElement(
                            d.default,
                            { span: 8 },
                            E.default.createElement(
                              i.default,
                              {
                                size: 'large',
                                disabled: n,
                                className: F.default.getCaptcha,
                                onClick: this.onGetCaptcha,
                              },
                              n
                                ? `${n} s`
                                : (0, M.formatMessage)({ id: 'app.register.get-verification-code' })
                            )
                          )
                        )
                      ),
                      E.default.createElement(
                        P,
                        null,
                        E.default.createElement(
                          i.default,
                          {
                            size: 'large',
                            loading: a,
                            className: F.default.submit,
                            type: 'primary',
                            htmlType: 'submit',
                          },
                          E.default.createElement(M.FormattedMessage, {
                            id: 'app.register.register',
                          })
                        ),
                        E.default.createElement(
                          b.default,
                          { className: F.default.login, to: '/User/Login' },
                          E.default.createElement(M.FormattedMessage, {
                            id: 'app.register.sing-in',
                          })
                        )
                      )
                    )
                  );
                }
              }),
              (g = h))
            ) || g)
        ) || g),
        N = x;
      t.default = N;
    },
  },
]);
