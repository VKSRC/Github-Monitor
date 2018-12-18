(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [4],
  {
    BOD2: function(e, t, a) {
      e.exports = {
        container: 'antd-pro-layouts-user-layout-container',
        content: 'antd-pro-layouts-user-layout-content',
        top: 'antd-pro-layouts-user-layout-top',
        header: 'antd-pro-layouts-user-layout-header',
        logo: 'antd-pro-layouts-user-layout-logo',
        title: 'antd-pro-layouts-user-layout-title',
        desc: 'antd-pro-layouts-user-layout-desc',
      };
    },
    jH8a: function(e, t, a) {
      'use strict';
      var l = a('284h'),
        u = a('TqRt');
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), a('Pwec');
      var o = u(a('CtXQ')),
        r = l(a('q1tI')),
        d = u(a('mOP9')),
        n = u(a('ggcP')),
        s = u(a('BOD2')),
        c = u(a('mxmt')),
        i = [
          {
            key: 'github',
            title: r.default.createElement(o.default, { type: 'github' }),
            href: 'https://github.com/VKSRC/Github-Monitor',
            blankTarget: !0,
          },
        ],
        f = r.default.createElement(
          r.Fragment,
          null,
          'Copyright ',
          r.default.createElement(o.default, { type: 'copyright' }),
          ' 2018 VIPKID - \u5b89\u5168\u4e2d\u5fc3'
        );
      class p extends r.default.PureComponent {
        render() {
          var e = this.props.children;
          return r.default.createElement(
            'div',
            { className: s.default.container },
            r.default.createElement(
              'div',
              { className: s.default.content },
              r.default.createElement(
                'div',
                { className: s.default.top },
                r.default.createElement(
                  'div',
                  { className: s.default.header },
                  r.default.createElement(
                    d.default,
                    { to: '/' },
                    r.default.createElement('img', {
                      alt: 'logo',
                      className: s.default.logo,
                      src: c.default,
                    }),
                    r.default.createElement(
                      'span',
                      { className: s.default.title },
                      'Github Monitor'
                    )
                  )
                ),
                r.default.createElement(
                  'div',
                  { className: s.default.desc },
                  'Github\u6cc4\u6f0f\u4fe1\u606f\u76d1\u63a7\u5e73\u53f0'
                )
              ),
              e
            ),
            r.default.createElement(n.default, { links: i, copyright: f })
          );
        }
      }
      var m = p;
      t.default = m;
    },
  },
]);
