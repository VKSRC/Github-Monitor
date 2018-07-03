import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Pagination } from '@icedesign/base';
import Item from './Item';
import axios from 'axios'
import {config} from '../../../../config'
import {statusConvert} from '../../../../utils'


export default class Lists extends Component {
  static displayName = 'Lists';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      data: [],
      status: '全部',
      language: '全部',
    };
  }

  buildUrl(page = 1, language = this.state.language, status = this.state.status) {
    return `${config.API_URL}/api/leakage?language=${language}&status=${status}&page=${page}`;
  }

  componentDidMount() {
    axios(this.buildUrl()).then((response) => {
      const {data} = response;
      this.setState({
        data: data,
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    let url = this.buildUrl(1, nextProps.language, statusConvert(nextProps.status));

    /*
      重新传入props是切换了filter
      所以这里默认渲染第一页的数据
    */
    this.setState({
      status: statusConvert(nextProps.status),
      language: nextProps.language,
      current: 1,
    });

    axios(url).then((response) => {
      const {data} = response;
      this.setState({
        data: data,
      })
    });
  }

  handlePaginationChange = (current) => {
    let url = this.buildUrl(current);
    axios(url).then((response) => {
      const {data} = response;
      this.setState({
        data: data,
      })
    });

    // 切换页面后，页面滚动到顶部
    scrollTo(0,0);
    this.setState({
      current,
    });
  };

  render() {
    if (this.state.data.items === undefined){
      return (
        <IceContainer>
          <div>正在加载...</div>
        </IceContainer>
      );
    } else {
      return (
        <IceContainer>

          {this.state.data.items.map((item, index) => {
            return <Item key={index} data={item} />
          })}
          <Pagination
            style={styles.pagination}
            current={this.state.current}
            onChange={this.handlePaginationChange}
            total={this.state.data.count}
            pageSize={this.state.data.per_page}
          />
        </IceContainer>
      );
    }

  }
}


const  styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
