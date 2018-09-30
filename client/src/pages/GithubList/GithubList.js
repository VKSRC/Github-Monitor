import React from 'react';
import { connect } from 'dva';
import { Card, Form, Avatar, Col, Row, Tag, Button, Pagination } from 'antd';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
class GithubList extends React.Component {
  render() {
    const Code = () => {
      const codeString = '(num) => num + 1';
      return (
        <SyntaxHighlighter language="javascript" style={github}>
          {codeString}
        </SyntaxHighlighter>
      );
    };

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

        <Card style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Row>
              <Col span={1}>
                <Avatar
                  size="large"
                  src="https://avatars1.githubusercontent.com/u/35955015?s=64&v=4"
                />
              </Col>
              <Col span={21}>
                <h3>
                  <a href="#" target="_blank">
                    wxfghy/scrapy-project
                  </a>{' '}
                  -{' '}
                  <a href="#">
                    <small>2016-03-17-part-time-online-esl-teachers.md</small>
                  </a>
                </h3>
                <Tag color="blue">Markdown</Tag>
                <Tag color="blue">2018-10-10 12:00:11</Tag>
                <Tag color="blue">待确认</Tag>
              </Col>
              <Col span={2}>
                <ButtonGroup>
                  <Button type="primary">确认</Button>
                  <Button>加白</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col>
                <Code />
              </Col>
            </Row>
          </div>

          <Pagination defaultCurrent={1} total={100} />
        </Card>
      </div>
    );
  }
}

export default GithubList;
