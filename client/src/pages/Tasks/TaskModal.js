import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class TaskModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  showModalHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  okHandler = () => {
    const { onOk, form, data } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if (!data) {
          onOk(values);
        } else {
          onOk(data.id, values);
        }
        form.resetFields();
        this.hideModalHandler();
      }
    });
  };

  hideModalHandler = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    const { children, form, data = {} } = this.props;
    const {
      name = '',
      keywords = '',
      ignore_org: ignoreOrg = '',
      ignore_repo: ignoreRepo = '',
      mail = '',
      pages = 5,
      interval = 60,
    } = data;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModalHandler}>{children}</span>
        <Modal
          title={data ? '编辑任务' : '添加任务'}
          visible={visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form layout="horizontal">
            <FormItem {...formItemLayout} label="任务名称">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {
                    required: true,
                    message: '任务名称不可以为空!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="关键词" help="支持多个关键词使用换行分隔">
              {getFieldDecorator('keywords', {
                initialValue: keywords,
                rules: [
                  {
                    required: true,
                    message: '关键词不可为空!',
                  },
                ],
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="忽略账号"
              help="忽略指定账号下的仓库, 支持多个账号名使用换行分隔, 如VKSRC"
            >
              {getFieldDecorator('ignore_org', {
                initialValue: ignoreOrg,
              })(<TextArea rows={3} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="忽略仓库"
              help="忽略包含某些关键词的仓库, 支持多个关键词使用换行分隔, 如.github.io"
            >
              {getFieldDecorator('ignore_repo', {
                initialValue: ignoreRepo,
              })(<TextArea rows={3} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="邮箱" help="支持多个邮箱使用分号(;)分隔">
              {getFieldDecorator('mail', {
                initialValue: mail,
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="爬取页数"
              help="默认为5页(一页50条记录); 0为搜索全部"
            >
              {getFieldDecorator('pages', {
                initialValue: pages,
              })(<InputNumber min={0} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="爬取间隔" help="单位: 分钟">
              {getFieldDecorator('interval', {
                initialValue: interval,
              })(<InputNumber min={0} />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(TaskModal);
