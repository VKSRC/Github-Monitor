import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Tag, Button, Dialog } from '@icedesign/base';
import axios from 'axios';
import {config} from '../../../../config'
import {statusConvert} from "../../../../utils";


const { Row, Col } = Grid;
const ButtonGroup = Button.Group;

export default class Item extends Component {
  static displayName = 'Item';

  constructor(props){
    super(props);
    this.state = {
      show: true,
    }
  }

  handleOperation(id, status, e) {
    axios.put(`${config.API_URL}/api/leakage/${id}`, {
      status: status,
    }).then((response) => {
      if (response.data.status === status) {
        Dialog.alert({
          title: "提示",
          content: "操作成功！",
          needWrapper: false,
          style: {
            width: "150px",
          },
          onOk: () => {
            this.setState({
              show: false,
            })
          }
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: true,
    })
  }

  render() {
    if (this.state.show) {
      return (
        <IceContainer>
          <div style={styles.code_list_item}>
            <Row>
              <Col l="24">
                <a href={this.props.data.account_url} target="_blank">
                  <img src={this.props.data.account_avatar} height="32" width="32"
                       style={styles.avatar}/>
                </a>
                <span style={styles.code_type}>
                <ButtonGroup>
                  {
                    this.props.data.status === 1
                    &&
                    <Button type="primary" onClick={(e) => this.handleOperation(this.props.data.id, 2, e)}>确认</Button>
                  }
                  {
                    this.props.data.status === 2
                    &&
                    <Button type="primary" onClick={(e) => this.handleOperation(this.props.data.id, 3, e)}>处理</Button>
                  }
                  {
                    this.props.data.status === 1
                    &&
                    <Button type="primary" onClick={(e) => this.handleOperation(this.props.data.id, 4, e)}>加白</Button>
                  }
                </ButtonGroup>
              </span>

                <Col l="24" className="leakage">
                  <a href={this.props.data.project_url} target="_blank" style={styles.code_title}>{this.props.data.account}/{this.props.data.project_name}</a>
                  <span style={{margin: '0 4px'}}>–</span>
                  <a href={this.props.data.file_url} target="_blank">{this.props.data.file_name}</a>

                  <div className="mb-8">
                    {this.props.data.language === null || <span><Tag shape="readonly" size="small">{this.props.data.language}</Tag></span>}
                    <span><Tag shape="readonly" size="small">发现：{this.props.data.add_time}</Tag></span>
                    {this.props.data.update_time === null || <span><Tag shape="readonly" size="small">更新：{this.props.data.update_time}</Tag></span>}
                    {this.props.data.handle_time === null || <span><Tag shape="readonly" size="small">处理：{this.props.data.handle_time}</Tag></span>}
                    <span><Tag shape="readonly" size="small">{statusConvert(null ,this.props.data.status)}</Tag></span>
                  </div>

                  <div className="code-list">
                    <div className="file-box blob-wrapper">
                      <div dangerouslySetInnerHTML={{__html: this.props.data.code}} />
                    </div>
                  </div>
                </Col>
              </Col>
            </Row>
          </div>

        </IceContainer>
      );
    }else{
      return null;
    }
  }

}


const styles = {
  code_list_item: {
    margin: '-20px -15px',
    lineHeight: 1.5,
    color: '#24292e',
  },
  avatar: {
    float: 'left',
    overflow: 'hidden',
    lineHeight: 1,
    verticalAlign: 'middle',
    borderRadius: '3px',
    marginRight: '8px',
  },
  code_type: {
    float: 'right',
    fontSize: '12px',
    color: '#586069',
  },
  code_title: {
    fontWeight: '500',
    color: '#0366d6',
    fontSize: '14px',
    lineHeight: 1.5,
  },
};
