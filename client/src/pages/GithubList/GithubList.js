import React from 'react';
import { connect } from 'dva';
import { Card, Form, Avatar, Col, Row, Tag, Button, Pagination, Select, Tooltip } from 'antd';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github as hlGithub } from 'react-syntax-highlighter/styles/hljs';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { leakageTagColor } from '../../constants';
import { FormatLeakageStatus } from './locales';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const { Option } = Select;

@connect(({ github }) => ({
  github,
}))
class GithubList extends React.Component {
  componentWillMount() {
    const { dispatch, location } = this.props;
    const { taskId } = location.query;

    const payload = {
      page: 1,
      pageSize: 10,
      status: '0',
    };

    // 如果从url中传入了taskId则加入到payload中
    if (taskId) {
      payload.task = taskId;
    }

    // 获取泄漏列表
    dispatch({
      type: 'github/fetchLeakageLists',
      payload,
    });

    // 获取任务列表(筛选需要用)
    dispatch({
      type: 'github/fetchTasks',
    });
  }

  changePage = page => {
    const { dispatch } = this.props;
    dispatch({
      type: 'github/changePage',
      payload: {
        page,
      },
    }).then(() => window.scrollTo(0, 0));
  };

  // 筛选状态
  changeTag = tag => {
    const status = tag.pop();
    const { dispatch } = this.props;

    dispatch({
      type: 'github/filterStatus',
      payload: {
        status,
      },
    });
  };

  // 更改泄漏项状态
  updateLeakageStatus = (id, status) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'github/updateLeakageStatus',
      payload: {
        id,
        status,
      },
    });
  };

  // 对指定仓库的泄露信息全部加白
  ignoreRepository = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'github/ignoreRepository',
      payload: {
        id,
      },
    });
  };

  // 任务筛选
  taskFilterHandler = task => {
    const { dispatch } = this.props;
    dispatch({
      type: 'github/filterTask',
      payload: {
        task,
      },
    });
  };

  render() {
    const { github } = this.props;
    const { tasks, status } = github;

    return (
      <div>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title={formatMessage({ id: 'github.filter.status' })}
              block
              style={{ paddingBottom: 11 }}
            >
              <FormItem>
                <TagSelect onChange={this.changeTag} value={status} hideCheckAll>
                  <TagSelect.Option value="a">
                    <FormattedMessage id="github.filter.status.all" />
                  </TagSelect.Option>
                  <TagSelect.Option value="0">
                    <FormattedMessage id="github.filter.status.unsolved" />
                  </TagSelect.Option>
                  <TagSelect.Option value="1">
                    <FormattedMessage id="github.filter.status.solved" />
                  </TagSelect.Option>
                  <TagSelect.Option value="2">
                    <FormattedMessage id="github.filter.status.whitelist" />
                  </TagSelect.Option>
                </TagSelect>
              </FormItem>
            </StandardFormRow>

            <StandardFormRow
              title={formatMessage({ id: 'github.filter.task' })}
              block
              style={{ paddingBottom: 11 }}
            >
              <FormItem wrapperCol={{ span: 6 }}>
                <Select
                  placeholder={formatMessage({ id: 'github.filter.task.placeholder' })}
                  onChange={this.taskFilterHandler}
                  value={github.task}
                  allowClear
                >
                  {tasks.map(task => (
                    <Option value={`${task.id}`} key={task.id}>
                      {task.name}
                    </Option>
                  ))}
                </Select>
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>

        {github.results.map(leakage => (
          <Card style={{ marginTop: '20px' }} key={leakage.id}>
            <div style={{ marginBottom: '10px' }}>
              <Row>
                <Col xxl={1} xl={1} lg={2} md={2} sm={2}>
                  <Avatar size="large" src={leakage.user_avatar} />
                </Col>
                <Col xxl={18} xl={16} lg={14} md={14} sm={14}>
                  <h3>
                    <a href={leakage.repo_url} target="_blank" rel="noopener noreferrer">
                      {leakage.user_name}/{leakage.repo_name}
                    </a>{' '}
                    -{' '}
                    <a href={leakage.html_url} target="_blank" rel="noopener noreferrer">
                      <small>{leakage.file_name}</small>
                    </a>
                  </h3>
                  <Tag color="blue">
                    {formatMessage({ id: 'github.list.upload-time' })}:{leakage.last_modified}
                  </Tag>
                  <Tag color="blue">
                    {formatMessage({ id: 'github.list.storage-time' })}:{leakage.add_time}
                  </Tag>
                  <Tag color="blue">{leakage.keyword}</Tag>
                  <Tag color={leakageTagColor[leakage.status]}>
                    {FormatLeakageStatus(leakage.status)}
                  </Tag>
                </Col>
                <Col xxl={5} xl={7} lg={8} md={8} sm={8}>
                  <ButtonGroup>
                    <Button type="primary" onClick={() => this.updateLeakageStatus(leakage.id, 1)}>
                      <FormattedMessage id="github.list.solved" />
                    </Button>
                    <Button onClick={() => this.updateLeakageStatus(leakage.id, 2)}>
                      <FormattedMessage id="github.list.add-whitelist" />
                    </Button>
                    <Tooltip title={formatMessage({ id: 'github.list.ignore-repo.tooltip' })}>
                      <Button onClick={() => this.ignoreRepository(leakage.id)}>
                        <FormattedMessage id="github.list.ignore-repo" />
                      </Button>
                    </Tooltip>
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

        <Card style={{ marginTop: '20px', textAlign: 'center' }}>
          <Pagination current={github.page} total={github.total} onChange={this.changePage} />
        </Card>
      </div>
    );
  }
}

export default GithubList;
