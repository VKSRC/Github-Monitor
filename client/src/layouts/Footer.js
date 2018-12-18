import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/VKSRC/Github-Monitor',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 VIPKID - 安全中心
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
