(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [1],
  {
    YmWs: function(e, t, r) {
      'use strict';
      var a = r('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
      var n = a(r('o0o1')),
        u = a(r('k63P')),
        o = {
          namespace: 'error',
          state: { error: '', isloading: !1 },
          effects: {
            query: n.default.mark(function e(t, r) {
              var a, o, s;
              return n.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (a = t.payload),
                          (o = r.call),
                          (s = r.put),
                          (e.next = 4),
                          o(u.default, a.code)
                        );
                      case 4:
                        return (e.next = 6), s({ type: 'trigger', payload: a.code });
                      case 6:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                this
              );
            }),
          },
          reducers: {
            trigger(e, t) {
              return { error: t.payload };
            },
          },
        };
      t.default = o;
    },
    k63P: function(e, t, r) {
      'use strict';
      var a = r('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = s);
      var n = a(r('o0o1')),
        u = a(r('yXPU')),
        o = a(r('t3Un'));
      function s(e) {
        return c.apply(this, arguments);
      }
      function c() {
        return (
          (c = (0, u.default)(
            n.default.mark(function e(t) {
              return n.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return e.abrupt('return', (0, o.default)(`/api/${t}`));
                      case 1:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          )),
          c.apply(this, arguments)
        );
      }
    },
  },
]);
