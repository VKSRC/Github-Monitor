(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [16],
  {
    GsTM: function(e, t, r) {
      'use strict';
      var a = r('TqRt'),
        i = r('284h');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), r('IzEo');
      var n = a(r('bx4M'));
      r('T2oS');
      var o = a(r('W9HT'));
      r('+L6B');
      var l,
        s,
        d = a(r('2/Rp')),
        u = i(r('q1tI')),
        g = r('MuoO'),
        p = a(r('uUKN')),
        c = ((l = (0, g.connect)(e => ({ isloading: e.error.isloading }))),
        l(
          (s = class extends u.PureComponent {
            constructor() {
              super(...arguments),
                (this.state = { isloading: !1 }),
                (this.triggerError = e => {
                  this.setState({ isloading: !0 });
                  var t = this.props.dispatch;
                  t({ type: 'error/query', payload: { code: e } });
                });
            }
            render() {
              var e = this.state.isloading;
              return u.default.createElement(
                n.default,
                null,
                u.default.createElement(
                  o.default,
                  { spinning: e, wrapperClassName: p.default.trigger },
                  u.default.createElement(
                    d.default,
                    { type: 'danger', onClick: () => this.triggerError(401) },
                    '\u89e6\u53d1401'
                  ),
                  u.default.createElement(
                    d.default,
                    { type: 'danger', onClick: () => this.triggerError(403) },
                    '\u89e6\u53d1403'
                  ),
                  u.default.createElement(
                    d.default,
                    { type: 'danger', onClick: () => this.triggerError(500) },
                    '\u89e6\u53d1500'
                  ),
                  u.default.createElement(
                    d.default,
                    { type: 'danger', onClick: () => this.triggerError(404) },
                    '\u89e6\u53d1404'
                  )
                )
              );
            }
          })
        ) || s),
        f = c;
      t.default = f;
    },
    uUKN: function(e, t, r) {
      e.exports = { trigger: 'antd-pro-pages-exception-style-trigger' };
    },
  },
]);
