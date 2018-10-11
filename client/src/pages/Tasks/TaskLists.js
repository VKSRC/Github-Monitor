import React from 'react';
import { Card, Table, Badge } from 'antd';
import { connect } from 'dva';
import { taskStatus } from '@/constants';

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
        title: '任务名称',
        dataIndex: 'name',
      },
      {
        title: '关键词',
        dataIndex: 'keywords',
      },
      {
        title: '爬取页数',
        dataIndex: 'pages',
      },
      {
        title: '爬取间隔',
        dataIndex: 'interval',
        render: record => `${record}分钟`,
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: record => {
          switch (taskStatus[record]) {
            case '等待中':
              return <Badge status="default" text={taskStatus[record]} />;
            case '运行中':
              return <Badge status="processing" text={taskStatus[record]} />;
            default:
              return <Badge status="success" text={taskStatus[record]} />;
          }
        },
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
      },
      {
        title: '完成时间',
        dataIndex: 'finished_time',
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

  render() {
    const { task } = this.props;
    return (
      <div>
        <Card bordered={false}>
          <Table columns={this.columns} dataSource={task.tasks} rowKey="id" />
        </Card>
      </div>
    );
  }
}

export default TaskLists;
