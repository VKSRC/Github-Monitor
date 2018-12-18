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
        h = r(a('Vl3Y')),
        v = s(a('q1tI')),
        E = a('MuoO'),
        w = a('LLXN'),
        M = r(a('mOP9')),
        b = r(a('usdK')),
        y = r(a('5WY0')),
        F = h.default.Item,
        P = p.default.Option,
        S = m.default.Group,
        k = {
          ok: v.default.createElement(
            'div',
            { className: y.default.success },
            v.default.createElement(w.FormattedMessage, {
              id: 'validation.password.strength.strong',
            })
          ),
          pass: v.default.createElement(
            'div',
            { className: y.default.warning },
            v.default.createElement(w.FormattedMessage, {
              id: 'validation.password.strength.medium',
            })
          ),
          poor: v.default.createElement(
            'div',
            { className: y.default.error },
            v.default.createElement(w.FormattedMessage, {
              id: 'validation.password.strength.short',
            })
          ),
        },
        C = { ok: 'success', pass: 'normal', poor: 'exception' },
        q = ((c = (0, E.connect)(e => {
          var t = e.register,
            a = e.loading;
          return { register: t, submitting: a.effects['register/submit'] };
        })),
        (f = h.default.create()),
        c(
          (g =
            f(
              (g = class extends v.Component {
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
                        ? a((0, w.formatMessage)({ id: 'validation.password.twice' }))
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
                          help: (0, w.formatMessage)({ id: 'validation.password.required' }),
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
                        ? v.default.createElement(
                            'div',
                            { className: y.default[`progress-${a}`] },
                            v.default.createElement(n.default, {
                              status: C[a],
                              className: y.default.progress,
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
                    b.default.push({ pathname: '/user/register-result', state: { account: r } });
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
                  return v.default.createElement(
                    'div',
                    { className: y.default.main },
                    v.default.createElement(
                      'h3',
                      null,
                      v.default.createElement(w.FormattedMessage, { id: 'app.register.register' })
                    ),
                    v.default.createElement(
                      h.default,
                      { onSubmit: this.handleSubmit },
                      v.default.createElement(
                        F,
                        null,
                        r('mail', {
                          rules: [
                            {
                              required: !0,
                              message: (0, w.formatMessage)({ id: 'validation.email.required' }),
                            },
                            {
                              type: 'email',
                              message: (0, w.formatMessage)({
                                id: 'validation.email.wrong-format',
                              }),
                            },
                          ],
                        })(
                          v.default.createElement(m.default, {
                            size: 'large',
                            placeholder: (0, w.formatMessage)({ id: 'form.email.placeholder' }),
                          })
                        )
                      ),
                      v.default.createElement(
                        F,
                        { help: c },
                        v.default.createElement(
                          o.default,
                          {
                            content: v.default.createElement(
                              'div',
                              { style: { padding: '4px 0' } },
                              k[this.getPasswordStatus()],
                              this.renderPasswordProgress(),
                              v.default.createElement(
                                'div',
                                { style: { marginTop: 10 } },
                                v.default.createElement(w.FormattedMessage, {
                                  id: 'validation.password.strength.msg',
                                })
                              )
                            ),
                            overlayStyle: { width: 240 },
                            placement: 'right',
                            visible: f,
                          },
                          r('password', { rules: [{ validator: this.checkPassword }] })(
                            v.default.createElement(m.default, {
                              size: 'large',
                              type: 'password',
                              placeholder: (0, w.formatMessage)({
                                id: 'form.password.placeholder',
                              }),
                            })
                          )
                        )
                      ),
                      v.default.createElement(
                        F,
                        null,
                        r('confirm', {
                          rules: [
                            {
                              required: !0,
                              message: (0, w.formatMessage)({
                                id: 'validation.confirm-password.required',
                              }),
                            },
                            { validator: this.checkConfirm },
                          ],
                        })(
                          v.default.createElement(m.default, {
                            size: 'large',
                            type: 'password',
                            placeholder: (0, w.formatMessage)({
                              id: 'form.confirm-password.placeholder',
                            }),
                          })
                        )
                      ),
                      v.default.createElement(
                        F,
                        null,
                        v.default.createElement(
                          S,
                          { compact: !0 },
                          v.default.createElement(
                            p.default,
                            {
                              size: 'large',
                              value: u,
                              onChange: this.changePrefix,
                              style: { width: '20%' },
                            },
                            v.default.createElement(P, { value: '86' }, '+86'),
                            v.default.createElement(P, { value: '87' }, '+87')
                          ),
                          r('mobile', {
                            rules: [
                              {
                                required: !0,
                                message: (0, w.formatMessage)({
                                  id: 'validation.phone-number.required',
                                }),
                              },
                              {
                                pattern: /^\d{10}$/,
                                message: (0, w.formatMessage)({
                                  id: 'validation.phone-number.wrong-format',
                                }),
                              },
                            ],
                          })(
                            v.default.createElement(m.default, {
                              size: 'large',
                              style: { width: '80%' },
                              placeholder: (0, w.formatMessage)({
                                id: 'form.phone-number.placeholder',
                              }),
                            })
                          )
                        )
                      ),
                      v.default.createElement(
                        F,
                        null,
                        v.default.createElement(
                          l.default,
                          { gutter: 8 },
                          v.default.createElement(
                            d.default,
                            { span: 16 },
                            r('captcha', {
                              rules: [
                                {
                                  required: !0,
                                  message: (0, w.formatMessage)({
                                    id: 'validation.verification-code.required',
                                  }),
                                },
                              ],
                            })(
                              v.default.createElement(m.default, {
                                size: 'large',
                                placeholder: (0, w.formatMessage)({
                                  id: 'form.verification-code.placeholder',
                                }),
                              })
                            )
                          ),
                          v.default.createElement(
                            d.default,
                            { span: 8 },
                            v.default.createElement(
                              i.default,
                              {
                                size: 'large',
                                disabled: n,
                                className: y.default.getCaptcha,
                                onClick: this.onGetCaptcha,
                              },
                              n
                                ? `${n} s`
                                : (0, w.formatMessage)({ id: 'app.register.get-verification-code' })
                            )
                          )
                        )
                      ),
                      v.default.createElement(
                        F,
                        null,
                        v.default.createElement(
                          i.default,
                          {
                            size: 'large',
                            loading: a,
                            className: y.default.submit,
                            type: 'primary',
                            htmlType: 'submit',
                          },
                          v.default.createElement(w.FormattedMessage, {
                            id: 'app.register.register',
                          })
                        ),
                        v.default.createElement(
                          M.default,
                          { className: y.default.login, to: '/User/Login' },
                          v.default.createElement(w.FormattedMessage, {
                            id: 'app.register.sing-in',
                          })
                        )
                      )
                    )
                  );
                }
              })
            ) || g)
        ) || g),
        x = q;
      t.default = x;
    },
  },
]);
