import React from 'react';
import { Card, Form, Button, Table } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

@connect(({ token }) => ({
  token,
}))
class TokenLists extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: 'token',
        dataIndex: 'value',
      },
    ];
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'token/fetchTokens',
      payload: {
        page: 1,
        pageSize: 10,
      },
    });
  }

  render() {
    const { token } = this.props;
    const { tokens } = token;
    return (
      <div>
        <Card bordered={false}>
          <Form>
            <FormItem>
              <Button type="primary">添加Token</Button>
            </FormItem>
          </Form>
          <Table columns={this.columns} dataSource={tokens} rowKey="id" />
        </Card>
      </div>
    );
  }
}

export default TokenLists;
