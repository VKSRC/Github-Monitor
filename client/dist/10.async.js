(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [10],
  {
    EriM: function(e, t, a) {
      'use strict';
      var s = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
      var r = s(a('MVZn'));
      a('miYZ');
      var n = s(a('tsqr')),
        u = s(a('o0o1')),
        c = a('WMoM'),
        p = {
          namespace: 'task',
          state: { page: 1, pageSize: 10, tasks: [], total: 0 },
          effects: {
            fetchTasks: u.default.mark(function e(t, a) {
              var s, r, n, p;
              return u.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (s = t.payload),
                          (r = a.call),
                          (n = a.put),
                          (e.next = 4),
                          r(c.queryTaskLists, s)
                        );
                      case 4:
                        return (
                          (p = e.sent), (e.next = 7), n({ type: 'show', response: p, payload: s })
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
            createTasks: u.default.mark(function e(t, a) {
              var s, r, p;
              return u.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (s = t.payload),
                          (r = a.call),
                          (p = a.put),
                          (e.next = 4),
                          r(c.queryCreateTask, s)
                        );
                      case 4:
                        return (
                          n.default.success('\u6dfb\u52a0\u4efb\u52a1\u6210\u529f!'),
                          (e.next = 7),
                          p({ type: 'reload' })
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
            editTask: u.default.mark(function e(t, a) {
              var s, r, p, o;
              return u.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (s = t.id),
                          (r = t.payload),
                          (p = a.call),
                          (o = a.put),
                          (e.next = 4),
                          p(c.queryEditTask, s, r)
                        );
                      case 4:
                        return (
                          n.default.success('\u4fee\u6539\u4efb\u52a1\u6210\u529f!'),
                          (e.next = 7),
                          o({ type: 'reload' })
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
            removeTask: u.default.mark(function e(t, a) {
              var s, r, p;
              return u.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (s = t.id),
                          (r = a.call),
                          (p = a.put),
                          (e.next = 4),
                          r(c.queryRemoveTask, s)
                        );
                      case 4:
                        return (
                          n.default.success('\u5220\u9664\u4efb\u52a1\u6210\u529f!'),
                          (e.next = 7),
                          p({ type: 'reload' })
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
            reload: u.default.mark(function e(t, a) {
              var s, r, n, c, p, o;
              return u.default.wrap(
                function(e) {
                  while (1)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (s = a.put), (r = a.select), (e.next = 3), r();
                      case 3:
                        return (
                          (n = e.sent),
                          (c = n.task),
                          (p = c.page),
                          (o = c.pageSize),
                          (e.next = 8),
                          s({ type: 'fetchTasks', payload: { page: p, pageSize: o } })
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
                tasks: t.response.results,
                total: t.response.count,
              });
            },
          },
        };
      t.default = p;
    },
  },
]);
