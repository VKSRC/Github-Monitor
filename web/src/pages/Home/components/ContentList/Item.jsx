import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Tag, Button } from '@icedesign/base';


const { Row, Col } = Grid;
const ButtonGroup = Button.Group;

export default class Item extends Component {
  static displayName = 'Item';

  constructor(props){
    super(props);
  }

  render() {
    return (
      <IceContainer>
        <div style={styles.code_list_item}>
          <Row>
            <Col l="24">
              <a href="#">
                <img src={this.props.data.account_avatar} height="32" width="32"
                     style={styles.avatar}/>
              </a>
              <span style={styles.code_type}>
                <ButtonGroup>
                  <Button type="primary">确认</Button>
                  <Button type="primary">处理</Button>
                  <Button type="primary">加白</Button>
                </ButtonGroup>
              </span>

              <Col l="24" className="leakage">
                <a href="index.js" style={styles.code_title}>{this.props.data.account}</a>
                <span style={{margin: '0 4px'}}>–</span>
                <a href="#">{this.props.data.file_name}</a>

                <div className="mb-8">
                  <span><Tag shape="readonly" size="small">{this.props.data.language}</Tag></span>
                  <span className="text-gray"><Tag shape="readonly" size="small">{this.props.data.add_time}</Tag></span>
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
