import React from 'react';
import { connect } from 'dva';
import { Card, Form, Avatar, Col, Row, Tag, Button, Pagination, Select } from 'antd';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github as hlGithub } from 'react-syntax-highlighter/styles/hljs';
import { leakageStatus, leakageTagColor } from '../../constants';

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
            <StandardFormRow title="状态" block style={{ paddingBottom: 11 }}>
              <FormItem>
                <TagSelect onChange={this.changeTag} value={status} hideCheckAll>
                  <TagSelect.Option value="a">全部</TagSelect.Option>
                  <TagSelect.Option value="0">未处理</TagSelect.Option>
                  <TagSelect.Option value="1">已处理</TagSelect.Option>
                  <TagSelect.Option value="2">白名单</TagSelect.Option>
                </TagSelect>
              </FormItem>
            </StandardFormRow>

            <StandardFormRow title="任务" block style={{ paddingBottom: 11 }}>
              <FormItem wrapperCol={{ span: 6 }}>
                <Select
                  placeholder="按任务筛选条目"
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
                  <Tag color="blue">{leakage.keyword}</Tag>
                  <Tag color={leakageTagColor[leakage.status]}>{leakageStatus[leakage.status]}</Tag>
                </Col>
                <Col span={3}>
                  <ButtonGroup>
                    <Button type="primary" onClick={() => this.updateLeakageStatus(leakage.id, 1)}>
                      处理
                    </Button>
                    <Button onClick={() => this.updateLeakageStatus(leakage.id, 2)}>加白</Button>
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
          <Pagination defaultCurrent={1} total={github.total} onChange={this.changePage} />
        </Card>
      </div>
    );
  }
}

export default GithubList;
