import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class TaskAddModal extends React.Component {
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
    const { children, form, data } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModalHandler}>{children}</span>
        <Modal
          title="添加任务"
          visible={visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form layout="horizontal">
            <FormItem {...formItemLayout} label="任务名称">
              {getFieldDecorator('name', {
                initialValue: data ? data.name : '',
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
                initialValue: data ? data.keywords : '',
                rules: [
                  {
                    required: true,
                    message: '关键词不可为空!',
                  },
                ],
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="邮箱" help="支持多个邮箱使用分号(;)分隔">
              {getFieldDecorator('mail', {
                initialValue: data ? data.email : '',
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="爬取页数"
              help="默认为5页(一页50条记录); 0为搜索全部"
            >
              {getFieldDecorator('pages', {
                initialValue: data ? data.pages : 5,
              })(<InputNumber min={0} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="爬取间隔" help="单位: 分钟">
              {getFieldDecorator('interval', {
                initialValue: data ? data.interval : 60,
              })(<InputNumber min={0} />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(TaskAddModal);
