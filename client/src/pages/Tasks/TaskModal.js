import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Tooltip, Icon } from 'antd';
import { formatMessage } from 'umi/locale';
import { matchMethod as allMatchMethod } from '@/constants';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

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
      match_method: matchMethod = '',
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
          title={
            data.name
              ? formatMessage({ id: 'task.modal.edit-task' })
              : formatMessage({ id: 'task.modal.create-task' })
          }
          visible={visible}
          onOk={this.okHandler}
          onCancel={this.hideModalHandler}
          style={{ top: 20 }}
        >
          <Form layout="horizontal">
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'task.modal.field.task-name' })}
            >
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'task.modal.field.task-name.required' }),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'task.modal.field.keyword' })}
              help={formatMessage({ id: 'task.modal.field.keyword.hint' })}
            >
              {getFieldDecorator('keywords', {
                initialValue: keywords,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<TextArea rows={4} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  {formatMessage({ id: 'task.modal.field.match-method' })}&nbsp;
                  <Tooltip title={
                    <div>
                      <p>{formatMessage({ id: 'task.modal.field.match-method.0.hint' })}</p>
                      <p>{formatMessage({ id: 'task.modal.field.match-method.1.hint' })}</p>
                      <p>{formatMessage({ id: 'task.modal.field.match-method.2.hint' })}</p>
                    </div>
                  }
                  >
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('match_method', {
                initialValue: matchMethod,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select>
                  {allMatchMethod.map((value, index) => (
                    <Option key={`matchMethod${value}`} value={index}>{formatMessage({ id: `task.modal.field.match-method.${index}` })}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'task.modal.field.ignore-username' })}
              help={formatMessage({ id: 'task.modal.field.ignore-username.hint' })}
            >
              {getFieldDecorator('ignore_org', {
                initialValue: ignoreOrg,
              })(<TextArea rows={3} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'task.modal.field.ignore-repo' })}
              help={formatMessage({ id: 'task.modal.field.ignore-repo.hint' })}
            >
              {getFieldDecorator('ignore_repo', {
                initialValue: ignoreRepo,
              })(<TextArea rows={3} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'task.modal.field.email' })}
              help={formatMessage({ id: 'task.modal.field.email.hint' })}
            >
              {getFieldDecorator('mail', {
                initialValue: mail,
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'task.modal.field.crawl-pages' })}
              help={formatMessage({ id: 'task.modal.field.crawl-pages.hint' })}
            >
              {getFieldDecorator('pages', {
                initialValue: pages,
              })(<InputNumber min={0} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={formatMessage({ id: 'task.modal.field.crawl-interval' })}
              help={formatMessage({ id: 'task.modal.field.crawl-interval.hint' })}
            >
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
