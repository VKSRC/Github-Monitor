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
        d,
        u = a(r('2/Rp')),
        g = i(r('q1tI')),
        p = r('MuoO'),
        c = a(r('uUKN')),
        f = ((l = (0, p.connect)(e => ({ isloading: e.error.isloading }))),
        l(
          ((d = class extends g.PureComponent {
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
              return g.default.createElement(
                n.default,
                null,
                g.default.createElement(
                  o.default,
                  { spinning: e, wrapperClassName: c.default.trigger },
                  g.default.createElement(
                    u.default,
                    { type: 'danger', onClick: () => this.triggerError(401) },
                    '\u89e6\u53d1401'
                  ),
                  g.default.createElement(
                    u.default,
                    { type: 'danger', onClick: () => this.triggerError(403) },
                    '\u89e6\u53d1403'
                  ),
                  g.default.createElement(
                    u.default,
                    { type: 'danger', onClick: () => this.triggerError(500) },
                    '\u89e6\u53d1500'
                  ),
                  g.default.createElement(
                    u.default,
                    { type: 'danger', onClick: () => this.triggerError(404) },
                    '\u89e6\u53d1404'
                  )
                )
              );
            }
          }),
          (s = d))
        ) || s),
        h = f;
      t.default = h;
    },
    uUKN: function(e, t, r) {
      e.exports = { trigger: 'antd-pro-pages-exception-style-trigger' };
    },
  },
]);
