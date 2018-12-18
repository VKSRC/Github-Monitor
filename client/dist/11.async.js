(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [11],
  {
    '3viS': function(e, t, a) {
      'use strict';
      var l = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('2qtc');
      var d = l(a('kLXV'));
      a('giR+');
      var r = l(a('fyUT')),
        s = l(a('pVnL'));
      a('5NDa');
      var n = l(a('5rEg'));
      a('y8nQ');
      var i = l(a('Vl3Y')),
        u = l(a('q1tI')),
        o = i.default.Item,
        f = n.default.TextArea;
      class c extends u.default.Component {
        constructor(e) {
          super(e),
            (this.showModalHandler = e => {
              e && e.stopPropagation(), this.setState({ visible: !0 });
            }),
            (this.okHandler = () => {
              var e = this.props,
                t = e.onOk,
                a = e.form,
                l = e.data;
              a.validateFields((e, d) => {
                e || (l ? t(l.id, d) : t(d), a.resetFields(), this.hideModalHandler());
              });
            }),
            (this.hideModalHandler = () => {
              this.setState({ visible: !1 });
            }),
            (this.state = { visible: !1 });
        }
        render() {
          var e = this.state.visible,
            t = this.props,
            a = t.children,
            l = t.form,
            c = t.data,
            p = void 0 === c ? {} : c,
            m = p.name,
            h = void 0 === m ? '' : m,
            v = p.keywords,
            k = void 0 === v ? '' : v,
            E = p.ignore_org,
            g = void 0 === E ? '' : E,
            y = p.ignore_repo,
            b = void 0 === y ? '' : y,
            w = p.mail,
            T = void 0 === w ? '' : w,
            x = p.pages,
            I = void 0 === x ? 5 : x,
            V = p.interval,
            H = void 0 === V ? 60 : V,
            S = l.getFieldDecorator,
            C = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
          return u.default.createElement(
            'span',
            null,
            u.default.createElement('span', { onClick: this.showModalHandler }, a),
            u.default.createElement(
              d.default,
              {
                title: p ? '\u7f16\u8f91\u4efb\u52a1' : '\u6dfb\u52a0\u4efb\u52a1',
                visible: e,
                onOk: this.okHandler,
                onCancel: this.hideModalHandler,
              },
              u.default.createElement(
                i.default,
                { layout: 'horizontal' },
                u.default.createElement(
                  o,
                  (0, s.default)({}, C, { label: '\u4efb\u52a1\u540d\u79f0' }),
                  S('name', {
                    initialValue: h,
                    rules: [
                      {
                        required: !0,
                        message: '\u4efb\u52a1\u540d\u79f0\u4e0d\u53ef\u4ee5\u4e3a\u7a7a!',
                      },
                    ],
                  })(u.default.createElement(n.default, null))
                ),
                u.default.createElement(
                  o,
                  (0, s.default)({}, C, {
                    label: '\u5173\u952e\u8bcd',
                    help:
                      '\u652f\u6301\u591a\u4e2a\u5173\u952e\u8bcd\u4f7f\u7528\u6362\u884c\u5206\u9694',
                  }),
                  S('keywords', {
                    initialValue: k,
                    rules: [
                      { required: !0, message: '\u5173\u952e\u8bcd\u4e0d\u53ef\u4e3a\u7a7a!' },
                    ],
                  })(u.default.createElement(f, { rows: 4 }))
                ),
                u.default.createElement(
                  o,
                  (0, s.default)({}, C, {
                    label: '\u5ffd\u7565\u8d26\u53f7',
                    help:
                      '\u5ffd\u7565\u6307\u5b9a\u8d26\u53f7\u4e0b\u7684\u4ed3\u5e93, \u652f\u6301\u591a\u4e2a\u8d26\u53f7\u540d\u4f7f\u7528\u6362\u884c\u5206\u9694, \u5982VKSRC',
                  }),
                  S('ignore_org', { initialValue: g })(u.default.createElement(f, { rows: 3 }))
                ),
                u.default.createElement(
                  o,
                  (0, s.default)({}, C, {
                    label: '\u5ffd\u7565\u4ed3\u5e93',
                    help:
                      '\u5ffd\u7565\u5305\u542b\u67d0\u4e9b\u5173\u952e\u8bcd\u7684\u4ed3\u5e93, \u652f\u6301\u591a\u4e2a\u5173\u952e\u8bcd\u4f7f\u7528\u6362\u884c\u5206\u9694, \u5982.github.io',
                  }),
                  S('ignore_repo', { initialValue: b })(u.default.createElement(f, { rows: 3 }))
                ),
                u.default.createElement(
                  o,
                  (0, s.default)({}, C, {
                    label: '\u90ae\u7bb1',
                    help:
                      '\u652f\u6301\u591a\u4e2a\u90ae\u7bb1\u4f7f\u7528\u5206\u53f7(;)\u5206\u9694',
                  }),
                  S('mail', { initialValue: T })(u.default.createElement(n.default, null))
                ),
                u.default.createElement(
                  o,
                  (0, s.default)({}, C, {
                    label: '\u722c\u53d6\u9875\u6570',
                    help:
                      '\u9ed8\u8ba4\u4e3a5\u9875(\u4e00\u987550\u6761\u8bb0\u5f55); 0\u4e3a\u641c\u7d22\u5168\u90e8',
                  }),
                  S('pages', { initialValue: I })(u.default.createElement(r.default, { min: 0 }))
                ),
                u.default.createElement(
                  o,
                  (0, s.default)({}, C, {
                    label: '\u722c\u53d6\u95f4\u9694',
                    help: '\u5355\u4f4d: \u5206\u949f',
                  }),
                  S('interval', { initialValue: H })(u.default.createElement(r.default, { min: 0 }))
                )
              )
            )
          );
        }
      }
      var p = i.default.create()(c);
      t.default = p;
    },
    tZ35: function(e, t, a) {
      'use strict';
      var l = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('IzEo');
      var d = l(a('bx4M'));
      a('g9YV');
      var r = l(a('wCAj'));
      a('+L6B');
      var s = l(a('2/Rp'));
      a('P2fV');
      var n = l(a('NJEC'));
      a('/zsF');
      var i = l(a('PArb'));
      a('Awhp');
      var u = l(a('KrTs'));
      a('y8nQ');
      var o,
        f,
        c = l(a('Vl3Y')),
        p = l(a('q1tI')),
        m = a('MuoO'),
        h = l(a('mOP9')),
        v = a('X7BR'),
        k = l(a('3viS')),
        E = c.default.Item,
        g = ((o = (0, m.connect)(e => {
          var t = e.task;
          return { task: t };
        })),
        o(
          (f = class extends p.default.Component {
            constructor(e) {
              super(e),
                (this.changePage = e => {
                  var t = this.props.dispatch;
                  t({ type: 'task/fetchTasks', payload: { page: e, pageSize: 10 } });
                }),
                (this.createTaskHandler = e => {
                  var t = this.props.dispatch;
                  t({ type: 'task/createTasks', payload: e });
                }),
                (this.editTaskHandler = (e, t) => {
                  var a = this.props.dispatch;
                  a({ type: 'task/editTask', id: e, payload: t });
                }),
                (this.removeTaskHandler = e => {
                  var t = this.props.dispatch;
                  t({ type: 'task/removeTask', id: e });
                }),
                (this.columns = [
                  { title: 'id', dataIndex: 'id' },
                  {
                    title: '\u4efb\u52a1\u540d\u79f0',
                    dataIndex: 'name',
                    render: (e, t) =>
                      p.default.createElement(h.default, { to: `/github/list/?taskId=${t.id}` }, e),
                  },
                  { title: '\u5173\u952e\u8bcd', dataIndex: 'keywords' },
                  { title: '\u722c\u53d6\u9875\u6570', dataIndex: 'pages' },
                  {
                    title: '\u722c\u53d6\u95f4\u9694',
                    dataIndex: 'interval',
                    render: e => `${e}\u5206\u949f`,
                  },
                  {
                    title: '\u72b6\u6001',
                    dataIndex: 'status',
                    render: e => {
                      switch (v.taskStatus[e]) {
                        case '\u7b49\u5f85\u4e2d':
                          return p.default.createElement(u.default, {
                            status: 'default',
                            text: v.taskStatus[e],
                          });
                        case '\u8fd0\u884c\u4e2d':
                          return p.default.createElement(u.default, {
                            status: 'processing',
                            text: v.taskStatus[e],
                          });
                        default:
                          return p.default.createElement(u.default, {
                            status: 'success',
                            text: v.taskStatus[e],
                          });
                      }
                    },
                  },
                  { title: '\u5f00\u59cb\u65f6\u95f4', dataIndex: 'start_time' },
                  { title: '\u5b8c\u6210\u65f6\u95f4', dataIndex: 'finished_time' },
                  {
                    title: '\u64cd\u4f5c',
                    key: 'action',
                    render: e =>
                      p.default.createElement(
                        'span',
                        null,
                        1 === e.status
                          ? '\u65e0'
                          : p.default.createElement(
                              'div',
                              null,
                              p.default.createElement(
                                k.default,
                                { data: e, onOk: this.editTaskHandler },
                                p.default.createElement('a', null, '\u7f16\u8f91')
                              ),
                              p.default.createElement(i.default, { type: 'vertical' }),
                              p.default.createElement(
                                n.default,
                                {
                                  title: '\u662f\u5426\u8981\u5220\u9664\u8be5\u4efb\u52a1\uff1f',
                                  onConfirm: () => this.removeTaskHandler(e.id),
                                },
                                p.default.createElement('a', null, '\u5220\u9664')
                              )
                            )
                      ),
                  },
                ]);
            }
            componentWillMount() {
              var e = this.props.dispatch;
              e({ type: 'task/fetchTasks', payload: { page: 1, pageSize: 10 } });
            }
            render() {
              var e = this.props.task;
              return p.default.createElement(
                'div',
                null,
                p.default.createElement(
                  d.default,
                  { bordered: !1 },
                  p.default.createElement(
                    c.default,
                    null,
                    p.default.createElement(
                      E,
                      null,
                      p.default.createElement(
                        k.default,
                        { onOk: this.createTaskHandler },
                        p.default.createElement(
                          s.default,
                          { type: 'primary' },
                          '\u6dfb\u52a0\u4efb\u52a1'
                        )
                      )
                    )
                  ),
                  p.default.createElement(r.default, {
                    columns: this.columns,
                    dataSource: e.tasks,
                    rowKey: 'id',
                    pagination: { current: e.page, total: e.total, onChange: this.changePage },
                  })
                )
              );
            }
          })
        ) || f),
        y = g;
      t.default = y;
    },
  },
]);
