(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [8],
  {
    '4Ofr': function(e, t, a) {
      e.exports = {
        themeColor: 'antd-pro-components-setting-drawer-theme-color-themeColor',
        title: 'antd-pro-components-setting-drawer-theme-color-title',
        colorBlock: 'antd-pro-components-setting-drawer-theme-color-colorBlock',
      };
    },
    AcjU: function(e, t, a) {
      'use strict';
      var l = a('284h'),
        n = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.getMenuMatchKeys = t.getFlatMenuKeys = void 0);
      var r = n(a('pVnL'));
      a('B9cy');
      var i = n(a('Ol7k')),
        o = l(a('q1tI')),
        s = n(a('bALw')),
        d = n(a('TSYQ')),
        u = n(a('mOP9')),
        c = n(a('mR0u')),
        h = l(a('oFg3')),
        p = a('S/9j'),
        m = i.default.Sider,
        f = e => {
          var t = e.location.pathname,
            a = e.flatMenuKeys;
          return (0, p.urlToList)(t)
            .map(e => (0, h.getMenuMatches)(a, e)[0])
            .filter(e => e);
        },
        g = e =>
          e.reduce((e, t) => {
            return e.push(t.path), t.children ? e.concat(g(t.children)) : e;
          }, []);
      t.getFlatMenuKeys = g;
      var v = (e, t) => t.reduce((t, a) => t.concat(e.filter(e => (0, s.default)(e).test(a))), []);
      t.getMenuMatchKeys = v;
      class y extends o.PureComponent {
        constructor(e) {
          super(e),
            (this.isMainMenu = e => {
              var t = this.props.menuData;
              return t.some(t => {
                return !!e && (t.key === e || t.path === e);
              });
            }),
            (this.handleOpenChange = e => {
              var t = e.filter(e => this.isMainMenu(e)).length > 1;
              this.setState({ openKeys: t ? [e.pop()] : [...e] });
            }),
            (this.flatMenuKeys = g(e.menuData)),
            (this.state = { openKeys: f(e) });
        }
        static getDerivedStateFromProps(e, t) {
          var a = t.pathname;
          return e.location.pathname !== a
            ? { pathname: e.location.pathname, openKeys: f(e) }
            : null;
        }
        render() {
          var e = this.props,
            t = e.logo,
            a = e.collapsed,
            l = e.onCollapse,
            n = e.fixSiderbar,
            i = e.theme,
            s = this.state.openKeys,
            p = a ? {} : { openKeys: s },
            f = (0, d.default)(c.default.sider, {
              [c.default.fixSiderbar]: n,
              [c.default.light]: 'light' === i,
            });
          return o.default.createElement(
            m,
            {
              trigger: null,
              collapsible: !0,
              collapsed: a,
              breakpoint: 'lg',
              onCollapse: l,
              width: 256,
              theme: i,
              className: f,
            },
            o.default.createElement(
              'div',
              { className: c.default.logo, id: 'logo' },
              o.default.createElement(
                u.default,
                { to: '/' },
                o.default.createElement('img', { src: t, alt: 'logo' }),
                o.default.createElement('h1', null, 'Github Monitor')
              )
            ),
            o.default.createElement(
              h.default,
              (0, r.default)(
                {},
                this.props,
                {
                  mode: 'inline',
                  handleOpenChange: this.handleOpenChange,
                  onOpenChange: this.handleOpenChange,
                  style: { padding: '16px 0', width: '100%' },
                },
                p
              )
            )
          );
        }
      }
      t.default = y;
    },
    BFsb: function(e, t, a) {
      e.exports = {
        content: 'antd-pro-components-setting-drawer-index-content',
        blockChecbox: 'antd-pro-components-setting-drawer-index-blockChecbox',
        item: 'antd-pro-components-setting-drawer-index-item',
        selectIcon: 'antd-pro-components-setting-drawer-index-selectIcon',
        color_block: 'antd-pro-components-setting-drawer-index-color_block',
        title: 'antd-pro-components-setting-drawer-index-title',
        handle: 'antd-pro-components-setting-drawer-index-handle',
        productionHint: 'antd-pro-components-setting-drawer-index-productionHint',
      };
    },
    IGtV: function(e, t, a) {
      e.exports = { fixedHeader: 'antd-pro-layouts-header-fixedHeader' };
    },
    IamK: function(e, t, a) {
      'use strict';
      var l = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('bbsP');
      var n = l(a('/wGt')),
        r = l(a('pVnL')),
        i = l(a('q1tI')),
        o = l(a('AcjU')),
        s = e => {
          var t = [];
          return (
            e.forEach(e => {
              e.children && (t = t.concat(s(e.children))), t.push(e.path);
            }),
            t
          );
        },
        d = e => {
          var t = e.isMobile,
            a = e.menuData,
            l = e.collapsed,
            d = e.onCollapse;
          return t
            ? i.default.createElement(
                n.default,
                {
                  visible: !l,
                  placement: 'left',
                  onClose: () => d(!0),
                  style: { padding: 0, height: '100vh' },
                },
                i.default.createElement(
                  o.default,
                  (0, r.default)({}, e, { flatMenuKeys: s(a), collapsed: !t && l })
                )
              )
            : i.default.createElement(o.default, (0, r.default)({}, e, { flatMenuKeys: s(a) }));
        },
        u = d;
      t.default = u;
    },
    JwhZ: function(e, t, a) {
      e.exports = {
        head: 'antd-pro-components-top-nav-header-index-head',
        light: 'antd-pro-components-top-nav-header-index-light',
        main: 'antd-pro-components-top-nav-header-index-main',
        wide: 'antd-pro-components-top-nav-header-index-wide',
        left: 'antd-pro-components-top-nav-header-index-left',
        right: 'antd-pro-components-top-nav-header-index-right',
        logo: 'antd-pro-components-top-nav-header-index-logo',
      };
    },
    NtFa: function(e, t, a) {
      'use strict';
      var l = a('TqRt'),
        n = a('284h');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('Pwec');
      var r,
        i,
        o,
        s = l(a('CtXQ')),
        d = l(a('U+yc')),
        u = n(a('q1tI')),
        c = l(a('mOP9')),
        h = l(a('fqkP')),
        p = l(a('h3zL')),
        m = l(a('X5mu')),
        f = ((r = (0, h.default)(600)),
        (o = class extends u.PureComponent {
          constructor() {
            super(...arguments),
              (this.toggle = () => {
                var e = this.props,
                  t = e.collapsed,
                  a = e.onCollapse;
                a(!t), this.triggerResizeEvent();
              });
          }
          componentWillUnmount() {
            this.triggerResizeEvent.cancel();
          }
          triggerResizeEvent() {
            var e = document.createEvent('HTMLEvents');
            e.initEvent('resize', !0, !1), window.dispatchEvent(e);
          }
          render() {
            var e = this.props,
              t = e.collapsed,
              a = e.isMobile,
              l = e.logo;
            return u.default.createElement(
              'div',
              { className: p.default.header },
              a &&
                u.default.createElement(
                  c.default,
                  { to: '/', className: p.default.logo, key: 'logo' },
                  u.default.createElement('img', { src: l, alt: 'logo', width: '32' })
                ),
              u.default.createElement(s.default, {
                className: p.default.trigger,
                type: t ? 'menu-unfold' : 'menu-fold',
                onClick: this.toggle,
              }),
              u.default.createElement(m.default, this.props)
            );
          }
        }),
        (i = o),
        (0, d.default)(
          i.prototype,
          'triggerResizeEvent',
          [r],
          Object.getOwnPropertyDescriptor(i.prototype, 'triggerResizeEvent'),
          i.prototype
        ),
        i);
      t.default = f;
    },
    PceP: function(e, t, a) {
      'use strict';
      var l = a('TqRt'),
        n = a('284h');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('bbsP');
      var r = l(a('/wGt'));
      a('fOrg');
      var i = l(a('+KLJ'));
      a('+L6B');
      var o = l(a('2/Rp'));
      a('miYZ');
      var s = l(a('tsqr'));
      a('/zsF');
      var d = l(a('PArb'));
      a('Pwec');
      var u = l(a('CtXQ'));
      a('5Dmo');
      var c = l(a('3S7+'));
      a('Mwp2');
      var h = l(a('VXEj'));
      a('BoS7');
      var p = l(a('Sdc0')),
        m = l(a('MVZn'));
      a('OaEy');
      var f,
        g,
        v,
        y = l(a('2fM7')),
        b = n(a('q1tI')),
        M = a('LLXN'),
        E = a('P5Jw'),
        C = a('MuoO'),
        k = l(a('BGR+')),
        x = l(a('BFsb')),
        N = l(a('WJM/')),
        P = l(a('Pjk0')),
        S = y.default.Option,
        w = e => {
          var t = e.children,
            a = e.title,
            l = e.style;
          return b.default.createElement(
            'div',
            { style: (0, m.default)({}, l, { marginBottom: 24 }) },
            b.default.createElement('h3', { className: x.default.title }, a),
            t
          );
        },
        L = ((f = (0, C.connect)(e => {
          var t = e.setting;
          return { setting: t };
        })),
        f(
          ((v = class extends b.PureComponent {
            constructor() {
              super(...arguments),
                (this.state = { collapse: !1 }),
                (this.getLayoutSetting = () => {
                  var e = this.props.setting,
                    t = e.contentWidth,
                    a = e.fixedHeader,
                    l = e.layout,
                    n = e.autoHideHeader,
                    r = e.fixSiderbar;
                  return [
                    {
                      title: (0, M.formatMessage)({ id: 'app.setting.content-width' }),
                      action: b.default.createElement(
                        y.default,
                        {
                          value: t,
                          size: 'small',
                          onSelect: e => this.changeSetting('contentWidth', e),
                          style: { width: 80 },
                        },
                        'sidemenu' === l
                          ? null
                          : b.default.createElement(
                              S,
                              { value: 'Fixed' },
                              (0, M.formatMessage)({ id: 'app.setting.content-width.fixed' })
                            ),
                        b.default.createElement(
                          S,
                          { value: 'Fluid' },
                          (0, M.formatMessage)({ id: 'app.setting.content-width.fluid' })
                        )
                      ),
                    },
                    {
                      title: (0, M.formatMessage)({ id: 'app.setting.fixedheader' }),
                      action: b.default.createElement(p.default, {
                        size: 'small',
                        checked: !!a,
                        onChange: e => this.changeSetting('fixedHeader', e),
                      }),
                    },
                    {
                      title: (0, M.formatMessage)({ id: 'app.setting.hideheader' }),
                      disabled: !a,
                      disabledReason: (0, M.formatMessage)({ id: 'app.setting.hideheader.hint' }),
                      action: b.default.createElement(p.default, {
                        size: 'small',
                        checked: !!n,
                        onChange: e => this.changeSetting('autoHideHeader', e),
                      }),
                    },
                    {
                      title: (0, M.formatMessage)({ id: 'app.setting.fixedsidebar' }),
                      disabled: 'topmenu' === l,
                      disabledReason: (0, M.formatMessage)({ id: 'app.setting.fixedsidebar.hint' }),
                      action: b.default.createElement(p.default, {
                        size: 'small',
                        checked: !!r,
                        onChange: e => this.changeSetting('fixSiderbar', e),
                      }),
                    },
                  ];
                }),
                (this.changeSetting = (e, t) => {
                  var a = this.props.setting,
                    l = (0, m.default)({}, a);
                  (l[e] = t),
                    'layout' === e
                      ? (l.contentWidth = 'topmenu' === t ? 'Fixed' : 'Fluid')
                      : 'fixedHeader' !== e || t || (l.autoHideHeader = !1),
                    this.setState(l, () => {
                      var e = this.props.dispatch;
                      e({ type: 'setting/changeSetting', payload: this.state });
                    });
                }),
                (this.togglerContent = () => {
                  var e = this.state.collapse;
                  this.setState({ collapse: !e });
                }),
                (this.renderLayoutSettingItem = e => {
                  var t = b.default.cloneElement(e.action, { disabled: e.disabled });
                  return b.default.createElement(
                    c.default,
                    { title: e.disabled ? e.disabledReason : '', placement: 'left' },
                    b.default.createElement(
                      h.default.Item,
                      { actions: [t] },
                      b.default.createElement(
                        'span',
                        { style: { opacity: e.disabled ? '0.5' : '' } },
                        e.title
                      )
                    )
                  );
                });
            }
            render() {
              var e = this.props.setting,
                t = e.navTheme,
                a = e.primaryColor,
                l = e.layout,
                n = e.colorWeak,
                c = this.state.collapse;
              return b.default.createElement(
                r.default,
                {
                  visible: c,
                  width: 300,
                  onClose: this.togglerContent,
                  placement: 'right',
                  handler: b.default.createElement(
                    'div',
                    { className: x.default.handle },
                    b.default.createElement(u.default, {
                      type: c ? 'close' : 'setting',
                      style: { color: '#fff', fontSize: 20 },
                    })
                  ),
                  onHandleClick: this.togglerContent,
                  style: { zIndex: 999 },
                },
                b.default.createElement(
                  'div',
                  { className: x.default.content },
                  b.default.createElement(
                    w,
                    { title: (0, M.formatMessage)({ id: 'app.setting.pagestyle' }) },
                    b.default.createElement(P.default, {
                      list: [
                        {
                          key: 'dark',
                          url:
                            'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                          title: (0, M.formatMessage)({ id: 'app.setting.pagestyle.dark' }),
                        },
                        {
                          key: 'light',
                          url:
                            'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                          title: (0, M.formatMessage)({ id: 'app.setting.pagestyle.light' }),
                        },
                      ],
                      value: t,
                      onChange: e => this.changeSetting('navTheme', e),
                    })
                  ),
                  b.default.createElement(N.default, {
                    title: (0, M.formatMessage)({ id: 'app.setting.themecolor' }),
                    value: a,
                    onChange: e => this.changeSetting('primaryColor', e),
                  }),
                  b.default.createElement(d.default, null),
                  b.default.createElement(
                    w,
                    { title: (0, M.formatMessage)({ id: 'app.setting.navigationmode' }) },
                    b.default.createElement(P.default, {
                      list: [
                        {
                          key: 'sidemenu',
                          url:
                            'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                          title: (0, M.formatMessage)({ id: 'app.setting.sidemenu' }),
                        },
                        {
                          key: 'topmenu',
                          url:
                            'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                          title: (0, M.formatMessage)({ id: 'app.setting.topmenu' }),
                        },
                      ],
                      value: l,
                      onChange: e => this.changeSetting('layout', e),
                    })
                  ),
                  b.default.createElement(h.default, {
                    split: !1,
                    dataSource: this.getLayoutSetting(),
                    renderItem: this.renderLayoutSettingItem,
                  }),
                  b.default.createElement(d.default, null),
                  b.default.createElement(
                    w,
                    { title: (0, M.formatMessage)({ id: 'app.setting.othersettings' }) },
                    b.default.createElement(
                      h.default.Item,
                      {
                        actions: [
                          b.default.createElement(p.default, {
                            size: 'small',
                            checked: !!n,
                            onChange: e => this.changeSetting('colorWeak', e),
                          }),
                        ],
                      },
                      (0, M.formatMessage)({ id: 'app.setting.weakmode' })
                    )
                  ),
                  b.default.createElement(d.default, null),
                  b.default.createElement(
                    E.CopyToClipboard,
                    {
                      text: JSON.stringify((0, k.default)(e, ['colorWeak']), null, 2),
                      onCopy: () =>
                        s.default.success((0, M.formatMessage)({ id: 'app.setting.copyinfo' })),
                    },
                    b.default.createElement(
                      o.default,
                      { block: !0, icon: 'copy' },
                      (0, M.formatMessage)({ id: 'app.setting.copy' })
                    )
                  ),
                  b.default.createElement(i.default, {
                    type: 'warning',
                    className: x.default.productionHint,
                    message: b.default.createElement(
                      'div',
                      null,
                      (0, M.formatMessage)({ id: 'app.setting.production.hint' }),
                      ' ',
                      b.default.createElement(
                        'a',
                        {
                          href: 'https://u.ant.design/pro-v2-default-settings',
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        },
                        'src/defaultSettings.js'
                      )
                    ),
                  })
                )
              );
            }
          }),
          (g = v))
        ) || g),
        O = L;
      t.default = O;
    },
    Pjk0: function(e, t, a) {
      'use strict';
      var l = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('5Dmo');
      var n = l(a('3S7+'));
      a('Pwec');
      var r = l(a('CtXQ')),
        i = l(a('q1tI')),
        o = l(a('BFsb')),
        s = e => {
          var t = e.value,
            a = e.onChange,
            l = e.list;
          return i.default.createElement(
            'div',
            { className: o.default.blockChecbox, key: t },
            l.map(e =>
              i.default.createElement(
                n.default,
                { title: e.title, key: e.key },
                i.default.createElement(
                  'div',
                  { className: o.default.item, onClick: () => a(e.key) },
                  i.default.createElement('img', { src: e.url, alt: e.key }),
                  i.default.createElement(
                    'div',
                    {
                      className: o.default.selectIcon,
                      style: { display: t === e.key ? 'block' : 'none' },
                    },
                    i.default.createElement(r.default, { type: 'check' })
                  )
                )
              )
            )
          );
        },
        d = s;
      t.default = d;
    },
    R1Dz: function(e, t, a) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
      var l = a('q1tI'),
        n = (0, l.createContext)();
      t.default = n;
    },
    'S/9j': function(e, t, a) {
      'use strict';
      function l(e) {
        var t = e.split('/').filter(e => e);
        return t.map((e, a) => `/${t.slice(0, a + 1).join('/')}`);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.urlToList = l);
    },
    'WJM/': function(e, t, a) {
      'use strict';
      var l = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('5Dmo');
      var n = l(a('3S7+')),
        r = l(a('pVnL'));
      a('Pwec');
      var i = l(a('CtXQ')),
        o = l(a('QILm')),
        s = l(a('q1tI')),
        d = a('LLXN'),
        u = l(a('4Ofr')),
        c = e => {
          var t = e.color,
            a = e.check,
            l = (0, o.default)(e, ['color', 'check']);
          return s.default.createElement(
            'div',
            (0, r.default)({}, l, { style: { backgroundColor: t } }),
            a ? s.default.createElement(i.default, { type: 'check' }) : ''
          );
        },
        h = e => {
          var t = e.colors,
            a = e.title,
            l = e.value,
            r = e.onChange,
            i = t;
          return (
            t ||
              (i = [
                { key: 'dust', color: '#F5222D' },
                { key: 'volcano', color: '#FA541C' },
                { key: 'sunset', color: '#FAAD14' },
                { key: 'cyan', color: '#13C2C2' },
                { key: 'green', color: '#52C41A' },
                { key: 'daybreak', color: '#1890FF' },
                { key: 'geekblue', color: '#2F54EB' },
                { key: 'purple', color: '#722ED1' },
              ]),
            s.default.createElement(
              'div',
              { className: u.default.themeColor },
              s.default.createElement('h3', { className: u.default.title }, a),
              s.default.createElement(
                'div',
                { className: u.default.content },
                i.map(e => {
                  var t = e.key,
                    a = e.color;
                  return s.default.createElement(
                    n.default,
                    { key: a, title: (0, d.formatMessage)({ id: `app.setting.themecolor.${t}` }) },
                    s.default.createElement(c, {
                      className: u.default.colorBlock,
                      color: a,
                      check: l === a,
                      onClick: () => r && r(a),
                    })
                  );
                })
              )
            )
          );
        },
        p = h;
      t.default = p;
    },
    X5mu: function(e, t, a) {
      'use strict';
      var l = a('284h'),
        n = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('+L6B');
      var r = n(a('2/Rp'));
      a('T2oS');
      var i = n(a('W9HT'));
      a('qVdP');
      var o = n(a('jsC+'));
      a('Telt');
      var s = n(a('Tckk'));
      a('lUTK');
      var d = n(a('BvKs'));
      a('Pwec');
      var u = n(a('CtXQ')),
        c = l(a('q1tI')),
        h = a('LLXN'),
        p = n(a('h3zL'));
      class m extends c.PureComponent {
        constructor() {
          super(...arguments),
            (this.changLang = () => {
              var e = (0, h.getLocale)();
              e && 'zh-CN' !== e ? (0, h.setLocale)('zh-CN') : (0, h.setLocale)('en-US');
            });
        }
        render() {
          var e = this.props,
            t = e.currentUser,
            a = e.onMenuClick,
            l = e.theme,
            n = c.default.createElement(
              d.default,
              { className: p.default.menu, selectedKeys: [], onClick: a },
              c.default.createElement(
                d.default.Item,
                { key: 'logout' },
                c.default.createElement(u.default, { type: 'logout' }),
                c.default.createElement(h.FormattedMessage, {
                  id: 'menu.account.logout',
                  defaultMessage: 'logout',
                })
              )
            ),
            m = p.default.right;
          return (
            'dark' === l && (m = `${p.default.right}  ${p.default.dark}`),
            c.default.createElement(
              'div',
              { className: m },
              t.username
                ? c.default.createElement(
                    o.default,
                    { overlay: n },
                    c.default.createElement(
                      'span',
                      { className: `${p.default.action} ${p.default.account}` },
                      c.default.createElement(s.default, {
                        size: 'small',
                        className: p.default.avatar,
                        src: 'https://file.vipkid.com.cn/vksrc/avatar/default.png',
                        alt: 'avatar',
                      }),
                      c.default.createElement('span', { className: p.default.name }, t.username)
                    )
                  )
                : c.default.createElement(i.default, {
                    size: 'small',
                    style: { marginLeft: 8, marginRight: 8 },
                  }),
              c.default.createElement(
                r.default,
                {
                  size: 'small',
                  ghost: 'dark' === l,
                  style: { margin: '0 8px' },
                  onClick: () => {
                    this.changLang();
                  },
                },
                c.default.createElement(h.FormattedMessage, { id: 'navbar.lang' })
              )
            )
          );
        }
      }
      t.default = m;
    },
    ctiy: function(e, t, a) {
      'use strict';
      var l = a('284h'),
        n = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
      var r = n(a('pVnL'));
      a('miYZ');
      var i = n(a('tsqr'));
      a('B9cy');
      var o = n(a('Ol7k')),
        s = l(a('q1tI')),
        d = a('LLXN'),
        u = n(a('MFj2')),
        c = a('MuoO'),
        h = n(a('usdK')),
        p = n(a('NtFa')),
        m = n(a('wWO0')),
        f = n(a('IGtV')),
        g = n(a('HZnN')),
        v = o.default.Header;
      class y extends s.PureComponent {
        constructor() {
          super(...arguments),
            (this.state = { visible: !0 }),
            (this.getHeadWidth = () => {
              var e = this.props,
                t = e.isMobile,
                a = e.collapsed,
                l = e.setting,
                n = l.fixedHeader,
                r = l.layout;
              return t || !n || 'topmenu' === r
                ? '100%'
                : a
                  ? 'calc(100% - 80px)'
                  : 'calc(100% - 256px)';
            }),
            (this.handleNoticeClear = e => {
              i.default.success(
                `${(0, d.formatMessage)({ id: 'component.noticeIcon.cleared' })} ${e}`
              );
              var t = this.props.dispatch;
              t({ type: 'global/clearNotices', payload: e });
            }),
            (this.handleMenuClick = e => {
              var t = e.key,
                a = this.props.dispatch;
              'userCenter' !== t
                ? 'triggerError' !== t
                  ? 'userinfo' !== t
                    ? 'logout' === t && a({ type: 'login/logout' })
                    : h.default.push('/account/settings/base')
                  : h.default.push('/exception/trigger')
                : h.default.push('/account/center');
            }),
            (this.handleNoticeVisibleChange = e => {
              if (e) {
                var t = this.props.dispatch;
                t({ type: 'global/fetchNotices' });
              }
            }),
            (this.handScroll = () => {
              var e = this.props.autoHideHeader,
                t = this.state.visible;
              if (e) {
                var a = document.body.scrollTop + document.documentElement.scrollTop;
                this.ticking ||
                  requestAnimationFrame(() => {
                    if (this.oldScrollTop > a)
                      return this.setState({ visible: !0 }), void (this.scrollTop = a);
                    a > 300 && t && this.setState({ visible: !1 }),
                      a < 300 && !t && this.setState({ visible: !0 }),
                      (this.oldScrollTop = a),
                      (this.ticking = !1);
                  }),
                  (this.ticking = !1);
              }
            });
        }
        static getDerivedStateFromProps(e, t) {
          return e.autoHideHeader || t.visible ? null : { visible: !0 };
        }
        componentDidMount() {
          document.addEventListener('scroll', this.handScroll, { passive: !0 });
        }
        componentWillUnmount() {
          document.removeEventListener('scroll', this.handScroll);
        }
        render() {
          var e = this.props,
            t = e.isMobile,
            a = e.handleMenuCollapse,
            l = e.setting,
            n = l.navTheme,
            i = l.layout,
            o = l.fixedHeader,
            d = this.state.visible,
            c = 'topmenu' === i,
            h = this.getHeadWidth(),
            y = d
              ? s.default.createElement(
                  v,
                  { style: { padding: 0, width: h }, className: o ? f.default.fixedHeader : '' },
                  c && !t
                    ? s.default.createElement(
                        m.default,
                        (0, r.default)(
                          {
                            theme: n,
                            mode: 'horizontal',
                            Authorized: g.default,
                            onCollapse: a,
                            onNoticeClear: this.handleNoticeClear,
                            onMenuClick: this.handleMenuClick,
                            onNoticeVisibleChange: this.handleNoticeVisibleChange,
                          },
                          this.props
                        )
                      )
                    : s.default.createElement(
                        p.default,
                        (0, r.default)(
                          {
                            onCollapse: a,
                            onNoticeClear: this.handleNoticeClear,
                            onMenuClick: this.handleMenuClick,
                            onNoticeVisibleChange: this.handleNoticeVisibleChange,
                          },
                          this.props
                        )
                      )
                )
              : null;
          return s.default.createElement(u.default, { component: '', transitionName: 'fade' }, y);
        }
      }
      var b = (0, c.connect)(e => {
        var t = e.user,
          a = e.global,
          l = e.setting,
          n = e.loading;
        return {
          currentUser: t.currentUser,
          collapsed: a.collapsed,
          fetchingNotices: n.effects['global/fetchNotices'],
          notices: a.notices,
          setting: l,
        };
      })(y);
      t.default = b;
    },
    gJ0l: function(e, t, a) {
      'use strict';
      var l = a('284h'),
        n = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('Pwec');
      var r = n(a('CtXQ'));
      a('B9cy');
      var i = n(a('Ol7k')),
        o = l(a('q1tI')),
        s = n(a('ggcP')),
        d = i.default.Footer,
        u = () =>
          o.default.createElement(
            d,
            { style: { padding: 0 } },
            o.default.createElement(s.default, {
              links: [
                {
                  key: 'github',
                  title: o.default.createElement(r.default, { type: 'github' }),
                  href: 'https://github.com/VKSRC/Github-Monitor',
                  blankTarget: !0,
                },
              ],
              copyright: o.default.createElement(
                o.Fragment,
                null,
                'Copyright ',
                o.default.createElement(r.default, { type: 'copyright' }),
                ' 2018 VIPKID - \u5b89\u5168\u4e2d\u5fc3'
              ),
            })
          ),
        c = u;
      t.default = c;
    },
    h3zL: function(e, t, a) {
      e.exports = {
        header: 'antd-pro-components-global-header-index-header',
        logo: 'antd-pro-components-global-header-index-logo',
        menu: 'antd-pro-components-global-header-index-menu',
        trigger: 'antd-pro-components-global-header-index-trigger',
        right: 'antd-pro-components-global-header-index-right',
        action: 'antd-pro-components-global-header-index-action',
        search: 'antd-pro-components-global-header-index-search',
        account: 'antd-pro-components-global-header-index-account',
        avatar: 'antd-pro-components-global-header-index-avatar',
        dark: 'antd-pro-components-global-header-index-dark',
        name: 'antd-pro-components-global-header-index-name',
      };
    },
    m8Tn: function(e, t, a) {
      'use strict';
      var l = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
      var n = l(a('pVnL')),
        r = l(a('MVZn'));
      a('B9cy');
      var i = l(a('Ol7k')),
        o = l(a('q1tI')),
        s = l(a('ZFw/')),
        d = l(a('Y+p1')),
        u = l(a('Wwog')),
        c = a('MuoO'),
        h = a('E6Dt'),
        p = l(a('TSYQ')),
        m = l(a('bALw')),
        f = a('4zCG'),
        g = a('LLXN'),
        v = l(a('IamK')),
        y = l(a('HZnN')),
        b = (l(a('PceP')), l(a('mxmt'))),
        M = l(a('gJ0l')),
        E = l(a('ctiy')),
        C = l(a('R1Dz')),
        k = l(a('wOmh')),
        x = i.default.Content;
      function N(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
          a = arguments.length > 2 ? arguments[2] : void 0,
          l = arguments.length > 3 ? arguments[3] : void 0;
        return e.map(e => {
          var n = 'menu';
          l && e.name ? (n = `${l}.${e.name}`) : e.name ? (n = `menu.${e.name}`) : l && (n = l);
          var i = (0, r.default)({}, e, { locale: n, authority: e.authority || a });
          if (e.routes) {
            var o = N(e.routes, `${t}${e.path}/`, e.authority, n);
            i.children = o;
          }
          return delete i.routes, i;
        });
      }
      var P = {
        'screen-xs': { maxWidth: 575 },
        'screen-sm': { minWidth: 576, maxWidth: 767 },
        'screen-md': { minWidth: 768, maxWidth: 991 },
        'screen-lg': { minWidth: 992, maxWidth: 1199 },
        'screen-xl': { minWidth: 1200, maxWidth: 1599 },
        'screen-xxl': { minWidth: 1600 },
      };
      class S extends o.default.PureComponent {
        constructor(e) {
          super(e),
            (this.state = { rendering: !0, isMobile: !1 }),
            (this.matchParamsPath = e => {
              var t = Object.keys(this.breadcrumbNameMap).find(t => (0, m.default)(t).test(e));
              return this.breadcrumbNameMap[t];
            }),
            (this.getPageTitle = e => {
              var t = this.matchParamsPath(e);
              if (!t) return 'Github Monitor';
              var a = (0, g.formatMessage)({ id: t.locale || t.name, defaultMessage: t.name });
              return `${a} - Github Monitor`;
            }),
            (this.getLayoutStyle = () => {
              var e = this.state.isMobile,
                t = this.props,
                a = t.fixSiderbar,
                l = t.collapsed,
                n = t.layout;
              return a && 'topmenu' !== n && !e ? { paddingLeft: l ? '80px' : '256px' } : null;
            }),
            (this.getContentStyle = () => {
              var e = this.props.fixedHeader;
              return { margin: '24px 24px 0', paddingTop: e ? 64 : 0 };
            }),
            (this.handleMenuCollapse = e => {
              var t = this.props.dispatch;
              t({ type: 'global/changeLayoutCollapsed', payload: e });
            }),
            (this.getPageTitle = (0, u.default)(this.getPageTitle)),
            (this.getBreadcrumbNameMap = (0, u.default)(this.getBreadcrumbNameMap, d.default)),
            (this.breadcrumbNameMap = this.getBreadcrumbNameMap()),
            (this.matchParamsPath = (0, u.default)(this.matchParamsPath, d.default));
        }
        componentDidMount() {
          var e = this.props.dispatch;
          e({ type: 'user/fetchCurrent' }),
            e({ type: 'setting/getSetting' }),
            (this.renderRef = requestAnimationFrame(() => {
              this.setState({ rendering: !1 });
            })),
            (this.enquireHandler = (0, f.enquireScreen)(e => {
              var t = this.state.isMobile;
              t !== e && this.setState({ isMobile: e });
            }));
        }
        componentDidUpdate(e) {
          this.breadcrumbNameMap = this.getBreadcrumbNameMap();
          var t = this.state.isMobile,
            a = this.props.collapsed;
          !t || e.isMobile || a || this.handleMenuCollapse(!1);
        }
        componentWillUnmount() {
          cancelAnimationFrame(this.renderRef), (0, f.unenquireScreen)(this.enquireHandler);
        }
        getContext() {
          var e = this.props.location;
          return { location: e, breadcrumbNameMap: this.breadcrumbNameMap };
        }
        getMenuData() {
          var e = this.props.route.routes;
          return N(e);
        }
        getBreadcrumbNameMap() {
          var e = {},
            t = a => {
              a.forEach(a => {
                a.children && t(a.children), (e[a.path] = a);
              });
            };
          return t(this.getMenuData()), e;
        }
        renderSettingDrawer() {
          this.state.rendering;
          return null;
        }
        render() {
          var e = this.props,
            t = e.navTheme,
            a = e.layout,
            l = e.children,
            d = e.location.pathname,
            u = this.state.isMobile,
            c = 'topmenu' === a,
            m = this.getMenuData(),
            f = this.matchParamsPath(d),
            g = o.default.createElement(
              i.default,
              null,
              c && !u
                ? null
                : o.default.createElement(
                    v.default,
                    (0, n.default)(
                      {
                        logo: b.default,
                        Authorized: y.default,
                        theme: t,
                        onCollapse: this.handleMenuCollapse,
                        menuData: m,
                        isMobile: u,
                      },
                      this.props
                    )
                  ),
              o.default.createElement(
                i.default,
                { style: (0, r.default)({}, this.getLayoutStyle(), { minHeight: '100vh' }) },
                o.default.createElement(
                  E.default,
                  (0, n.default)(
                    {
                      menuData: m,
                      handleMenuCollapse: this.handleMenuCollapse,
                      logo: b.default,
                      isMobile: u,
                    },
                    this.props
                  )
                ),
                o.default.createElement(
                  x,
                  { style: this.getContentStyle() },
                  o.default.createElement(
                    y.default,
                    { authority: f.authority, noMatch: o.default.createElement(k.default, null) },
                    l
                  )
                ),
                o.default.createElement(M.default, null)
              )
            );
          return o.default.createElement(
            o.default.Fragment,
            null,
            o.default.createElement(
              s.default,
              { title: this.getPageTitle(d) },
              o.default.createElement(h.ContainerQuery, { query: P }, e =>
                o.default.createElement(
                  C.default.Provider,
                  { value: this.getContext() },
                  o.default.createElement('div', { className: (0, p.default)(e) }, g)
                )
              )
            ),
            this.renderSettingDrawer()
          );
        }
      }
      var w = (0, c.connect)(e => {
        var t = e.global,
          a = e.setting;
        return (0, r.default)({ collapsed: t.collapsed, layout: a.layout }, a);
      })(S);
      t.default = w;
    },
    mR0u: function(e, t, a) {
      e.exports = {
        logo: 'antd-pro-components-sider-menu-index-logo',
        sider: 'antd-pro-components-sider-menu-index-sider',
        fixSiderbar: 'antd-pro-components-sider-menu-index-fixSiderbar',
        light: 'antd-pro-components-sider-menu-index-light',
        icon: 'antd-pro-components-sider-menu-index-icon',
      };
    },
    oFg3: function(e, t, a) {
      'use strict';
      var l = a('284h'),
        n = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = t.getMenuMatches = void 0);
      var r = n(a('pVnL'));
      a('Pwec');
      var i = n(a('CtXQ'));
      a('lUTK');
      var o = n(a('BvKs')),
        s = l(a('q1tI')),
        d = n(a('mOP9')),
        u = a('LLXN'),
        c = n(a('bALw')),
        h = a('S/9j'),
        p = n(a('mR0u')),
        m = o.default.SubMenu,
        f = e => {
          return 'string' === typeof e && 0 === e.indexOf('http')
            ? s.default.createElement('img', { src: e, alt: 'icon', className: p.default.icon })
            : 'string' === typeof e
              ? s.default.createElement(i.default, { type: e })
              : e;
        },
        g = (e, t) => e.filter(e => e && (0, c.default)(e).test(t));
      t.getMenuMatches = g;
      class v extends s.PureComponent {
        constructor(e) {
          super(e),
            (this.getNavMenuItems = (e, t) => {
              return e
                ? e
                    .filter(e => e.name && !e.hideInMenu)
                    .map(e => {
                      var a = this.getSubMenuOrItem(e, t);
                      return this.checkPermissionItem(e.authority, a);
                    })
                    .filter(e => e)
                : [];
            }),
            (this.getSelectedMenuKeys = () => {
              var e = this.props.location.pathname;
              return (0, h.urlToList)(e).map(e => g(this.flatMenuKeys, e).pop());
            }),
            (this.getSubMenuOrItem = e => {
              if (e.children && !e.hideChildrenInMenu && e.children.some(e => e.name)) {
                var t = (0, u.formatMessage)({ id: e.locale });
                return s.default.createElement(
                  m,
                  {
                    title: e.icon
                      ? s.default.createElement(
                          'span',
                          null,
                          f(e.icon),
                          s.default.createElement('span', null, t)
                        )
                      : t,
                    key: e.path,
                  },
                  this.getNavMenuItems(e.children)
                );
              }
              return s.default.createElement(
                o.default.Item,
                { key: e.path },
                this.getMenuItemPath(e)
              );
            }),
            (this.getMenuItemPath = e => {
              var t = (0, u.formatMessage)({ id: e.locale }),
                a = this.conversionPath(e.path),
                l = f(e.icon),
                n = e.target;
              if (/^https?:\/\//.test(a))
                return s.default.createElement(
                  'a',
                  { href: a, target: n },
                  l,
                  s.default.createElement('span', null, t)
                );
              var r = this.props,
                i = r.location,
                o = r.isMobile,
                c = r.onCollapse;
              return s.default.createElement(
                d.default,
                {
                  to: a,
                  target: n,
                  replace: a === i.pathname,
                  onClick: o
                    ? () => {
                        c(!0);
                      }
                    : void 0,
                },
                l,
                s.default.createElement('span', null, t)
              );
            }),
            (this.checkPermissionItem = (e, t) => {
              var a = this.props.Authorized;
              if (a && a.check) {
                var l = a.check;
                return l(e, t);
              }
              return t;
            }),
            (this.conversionPath = e => {
              return e && 0 === e.indexOf('http') ? e : `/${e || ''}`.replace(/\/+/g, '/');
            }),
            (this.flatMenuKeys = this.getFlatMenuKeys(e.menuData));
        }
        getFlatMenuKeys(e) {
          var t = [];
          return (
            e.forEach(e => {
              e.children && (t = t.concat(this.getFlatMenuKeys(e.children))), t.push(e.path);
            }),
            t
          );
        }
        render() {
          var e = this.props,
            t = e.openKeys,
            a = e.theme,
            l = e.mode,
            n = this.getSelectedMenuKeys();
          !n.length && t && (n = [t[t.length - 1]]);
          var i = {};
          t && (i = { openKeys: t });
          var d = this.props,
            u = d.handleOpenChange,
            c = d.style,
            h = d.menuData;
          return s.default.createElement(
            o.default,
            (0, r.default)(
              {
                key: 'Menu',
                mode: l,
                theme: a,
                onOpenChange: u,
                selectedKeys: n,
                style: c,
                className: 'horizontal' === l ? 'top-nav-menu' : '',
              },
              i
            ),
            this.getNavMenuItems(h)
          );
        }
      }
      t.default = v;
    },
    wWO0: function(e, t, a) {
      'use strict';
      var l = a('284h'),
        n = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
      var r = n(a('pVnL')),
        i = l(a('q1tI')),
        o = n(a('mOP9')),
        s = n(a('X5mu')),
        d = n(a('oFg3')),
        u = n(a('JwhZ'));
      class c extends i.PureComponent {
        constructor(e) {
          super(e),
            (this.state = {
              maxWidth:
                ('Fixed' === e.contentWidth ? 1200 : window.innerWidth) - 330 - 165 - 4 - 36,
            });
        }
        static getDerivedStateFromProps(e) {
          return {
            maxWidth: ('Fixed' === e.contentWidth ? 1200 : window.innerWidth) - 330 - 165 - 4 - 36,
          };
        }
        render() {
          var e = this.props,
            t = e.theme,
            a = e.contentWidth,
            l = e.logo,
            n = this.state.maxWidth;
          return i.default.createElement(
            'div',
            { className: `${u.default.head} ${'light' === t ? u.default.light : ''}` },
            i.default.createElement(
              'div',
              {
                ref: e => {
                  this.maim = e;
                },
                className: `${u.default.main} ${'Fixed' === a ? u.default.wide : ''}`,
              },
              i.default.createElement(
                'div',
                { className: u.default.left },
                i.default.createElement(
                  'div',
                  { className: u.default.logo, key: 'logo', id: 'logo' },
                  i.default.createElement(
                    o.default,
                    { to: '/' },
                    i.default.createElement('img', { src: l, alt: 'logo' }),
                    i.default.createElement('h1', null, 'Github Monitor')
                  )
                ),
                i.default.createElement(
                  'div',
                  { style: { maxWidth: n } },
                  i.default.createElement(
                    d.default,
                    (0, r.default)({}, this.props, { style: { border: 'none', height: 64 } })
                  )
                )
              ),
              i.default.createElement(s.default, this.props)
            )
          );
        }
      }
      t.default = c;
    },
  },
]);
