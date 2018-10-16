import React from 'react';
import { Form, Modal, Input } from 'antd';

const FormItem = Form.Item;

class TokenAddModal extends React.Component {
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
    const { onOk, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
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
    const { children, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <span>
        <span onClick={this.showModalHandler}>{children}</span>
        <Modal
          title="添加Token"
          visible={visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
        >
          <Form layout="horizontal">
            <FormItem {...formItemLayout} label="Token">
              {getFieldDecorator('value', {
                rules: [
                  {
                    required: true,
                    message: 'Token不可为空!',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(TokenAddModal);
