import React from 'react';
import { Card, Table, Badge, Form, Button, Divider, Popconfirm, Tooltip } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { matchMethod, taskStatus } from '@/constants';
import TaskModal from './TaskModal';

const FormItem = Form.Item;

@connect(({ task }) => ({
  task,
}))
class TaskLists extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: formatMessage({ id: 'task.table.columns.task-name' }),
        dataIndex: 'name',
        render: (record, obj) => <Link to={`/list/?taskId=${obj.id}`}>{record}</Link>,
      },
      {
        title: formatMessage({ id: 'task.table.columns.keyword' }),
        dataIndex: 'keywords',
      },
      {
        title: formatMessage({ id: 'task.modal.field.match-method' }),
        dataIndex: 'match_method',
        render: record => formatMessage({ id: `task.modal.field.match-method.${record}` })
      },
      {
        title: formatMessage({ id: 'task.table.columns.crawl-pages' }),
        dataIndex: 'pages',
      },
      {
        title: formatMessage({ id: 'task.table.columns.crawl-interval' }),
        dataIndex: 'interval',
        render: record => `${record} ${formatMessage({ id: 'task.table.columns.minutes' })}`,
      },
      {
        title: formatMessage({ id: 'task.table.columns.status' }),
        dataIndex: 'status',
        render: record => {
          switch (taskStatus[record]) {
            case '等待中':
              return <Badge status="default" text={formatMessage({ id: 'task.status.waiting' })} />;
            case '运行中':
              return (
                <Badge status="processing" text={formatMessage({ id: 'task.status.running' })} />
              );
            default:
              return (
                <Badge status="success" text={formatMessage({ id: 'task.status.finished' })} />
              );
          }
        },
      },
      {
        title: formatMessage({ id: 'task.table.columns.start-time' }),
        dataIndex: 'start_time',
      },
      {
        title: formatMessage({ id: 'task.table.columns.finished-time' }),
        dataIndex: 'finished_time',
      },
      {
        title: formatMessage({ id: 'task.table.columns.operation' }),
        key: 'action',
        render: obj => (
          <span>
            {obj.status === 1 ? (
              <Tooltip title={formatMessage({ id: 'task.operation.no-operations-hint' })}>
                <span>
                  <FormattedMessage id="task.operation.no-operations" />
                </span>
              </Tooltip>
            ) : (
              <div>
                <TaskModal data={obj} onOk={this.editTaskHandler}>
                  <a>
                    <FormattedMessage id="task.operation.edit" />
                  </a>
                </TaskModal>
                <Divider type="vertical" />
                <Popconfirm
                  title={formatMessage({ id: 'task.operation.delete-hint' })}
                  onConfirm={() => this.removeTaskHandler(obj.id)}
                >
                  <a>
                    <FormattedMessage id="task.operation.delete" />
                  </a>
                </Popconfirm>
              </div>
            )}
          </span>
        ),
      },
    ];
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetchTasks',
      payload: {
        page: 1,
        pageSize: 10,
      },
    });
  }

  changePage = page => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetchTasks',
      payload: {
        page,
        pageSize: 10,
      },
    });
  };

  createTaskHandler = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/createTasks',
      payload: values,
    });
  };

  editTaskHandler = (id, values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/editTask',
      id,
      payload: values,
    });
  };

  removeTaskHandler = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/removeTask',
      id,
    });
  };

  render() {
    const { task } = this.props;

    return (
      <div>
        <Card bordered={false}>
          <Form>
            <FormItem>
              <TaskModal onOk={this.createTaskHandler}>
                <Button type="primary">
                  <FormattedMessage id="task.operation.create-task" />
                </Button>
              </TaskModal>
            </FormItem>
          </Form>
          <Table
            columns={this.columns}
            dataSource={task.tasks}
            rowKey="id"
            pagination={{
              current: task.page,
              total: task.total,
              onChange: this.changePage,
            }}
          />
        </Card>
      </div>
    );
  }
}

export default TaskLists;
