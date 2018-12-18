(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [12],
  {
    'L0/H': function(e, t, a) {
      'use strict';
      var n = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
      var r = n(a('MVZn'));
      a('miYZ');
      var s = n(a('tsqr')),
        o = n(a('o0o1')),
        u = a('WMoM'),
        c = {
          namespace: 'token',
          state: { page: 1, pageSize: 10, tokens: [], total: 0 },
          effects: {
            fetchTokens: o.default.mark(function e(t, a) {
              var n, r, s, c;
              return o.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = t.payload),
                          (r = a.call),
                          (s = a.put),
                          (e.next = 4),
                          r(u.queryTokenLists, n)
                        );
                      case 4:
                        return (
                          (c = e.sent), (e.next = 7), s({ type: 'show', response: c, payload: n })
                        );
                      case 7:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                this
              );
            }),
            createToken: o.default.mark(function e(t, a) {
              var n, r, c;
              return o.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = t.payload),
                          (r = a.call),
                          (c = a.put),
                          (e.next = 4),
                          r(u.queryCreateToken, n)
                        );
                      case 4:
                        return (
                          s.default.success('\u6dfb\u52a0Token\u6210\u529f!'),
                          (e.next = 7),
                          c({ type: 'reload' })
                        );
                      case 7:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                this
              );
            }),
            reload: o.default.mark(function e(t, a) {
              var n, r, s, u, c, p;
              return o.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (n = a.put), (r = a.select), (e.next = 3), r();
                      case 3:
                        return (
                          (s = e.sent),
                          (u = s.token),
                          (c = u.page),
                          (p = u.pageSize),
                          (e.next = 8),
                          n({ type: 'fetchTokens', payload: { page: c, pageSize: p } })
                        );
                      case 8:
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
            show(e, t) {
              return (0, r.default)({}, e, t.payload, {
                tokens: t.response.results,
                total: t.response.count,
              });
            },
          },
        };
      t.default = c;
    },
  },
]);
