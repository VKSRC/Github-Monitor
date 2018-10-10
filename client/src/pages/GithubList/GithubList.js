import React from 'react';
import { connect } from 'dva';
import { Card, Form, Avatar, Col, Row, Tag, Button, Pagination } from 'antd';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github as hlGithub } from 'react-syntax-highlighter/styles/hljs';
import { leakageStatus, leakageTagColor } from '../../constants';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;

@connect(({ github, loading }) => ({
  github,
  loading: loading.effects['github/fetchLeakageLists'],
}))
class GithubList extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'github/fetchLeakageLists',
      payload: {
        page: 1,
        pageSize: 10,
      },
    });
  }

  changePage = page => {
    const { dispatch } = this.props;
    dispatch({
      type: 'github/fetchLeakageLists',
      payload: {
        page,
        pageSize: 10,
      },
    }).then(() => window.scrollTo(0, 0));
  };

  render() {
    const { github } = this.props;
    console.log(github);

    return (
      <div>
        <Card title="Github泄漏查询" bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="状态" block style={{ paddingBottom: 11 }}>
              <FormItem>
                <TagSelect>
                  <TagSelect.Option value="cat1">待确认</TagSelect.Option>
                  <TagSelect.Option value="cat2">待处理</TagSelect.Option>
                  <TagSelect.Option value="cat3">已处理</TagSelect.Option>
                  <TagSelect.Option value="cat4">无风险</TagSelect.Option>
                </TagSelect>
              </FormItem>
            </StandardFormRow>

            <StandardFormRow title="类型" block style={{ paddingBottom: 11 }}>
              <FormItem>
                <TagSelect>
                  <TagSelect.Option value="cat1">HTML</TagSelect.Option>
                  <TagSelect.Option value="cat2">Text</TagSelect.Option>
                  <TagSelect.Option value="cat3">CSV</TagSelect.Option>
                  <TagSelect.Option value="cat4">Markdown</TagSelect.Option>
                  <TagSelect.Option value="cat5">JSON</TagSelect.Option>
                  <TagSelect.Option value="cat6">Jupyter NoteBook</TagSelect.Option>
                  <TagSelect.Option value="cat7">Javascript</TagSelect.Option>
                  <TagSelect.Option value="cat8">Java</TagSelect.Option>
                  <TagSelect.Option value="cat9">XML</TagSelect.Option>
                </TagSelect>
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>

        {github.results.map(leakage => (
          <Card style={{ marginTop: '20px' }} key={leakage.id}>
            <div style={{ marginBottom: '10px' }}>
              <Row>
                <Col span={1}>
                  <Avatar size="large" src={leakage.user_avatar} />
                </Col>
                <Col span={20}>
                  <h3>
                    <a href={leakage.repo_url} target="_blank" rel="noopener noreferrer">
                      {leakage.user_name}/{leakage.repo_name}
                    </a>{' '}
                    -{' '}
                    <a href={leakage.html_url}>
                      <small>{leakage.file_name}</small>
                    </a>
                  </h3>
                  <Tag color="blue">
                    发布时间：
                    {leakage.last_modified}
                  </Tag>
                  <Tag color="blue">
                    入库时间：
                    {leakage.add_time}
                  </Tag>
                  <Tag color={leakageTagColor[leakage.status]}>{leakageStatus[leakage.status]}</Tag>
                </Col>
                <Col span={3}>
                  <ButtonGroup>
                    <Button type="primary">确认</Button>
                    <Button>加白</Button>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col>
                  <SyntaxHighlighter language="javascript" style={hlGithub}>
                    {leakage.fragment}
                  </SyntaxHighlighter>
                </Col>
              </Row>
            </div>
          </Card>
        ))}

        <Card style={{ marginTop: '20px' }}>
          <Pagination defaultCurrent="1" total={github.total} onChange={this.changePage} />
        </Card>
      </div>
    );
  }
}

export default GithubList;
