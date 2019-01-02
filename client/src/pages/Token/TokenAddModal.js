import React from 'react';
import { Form, Modal, Input } from 'antd';
import { formatMessage } from 'umi/locale';

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
    const { form } = this.props;
    this.setState({
      visible: false,
    });
    form.resetFields();
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
          title={formatMessage({ id: 'token.operation.add-token' })}
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
                    message: formatMessage({ id: 'token.modal.field.token.required' }),
                  },
                  {
                    len: 40,
                    message: formatMessage({ id: 'token.modal.field.token.hint' }),
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
