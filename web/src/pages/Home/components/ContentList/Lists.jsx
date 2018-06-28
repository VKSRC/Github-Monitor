import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Pagination } from '@icedesign/base';
import Item from './Item';
import axios from 'axios'


export default class Lists extends Component {
  static displayName = 'Lists';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      data: [],
    };
  }

  componentDidMount() {
    axios('http://127.0.0.1:5000/api/leakage').then((response) => {
      const {data} = response;
      this.setState({
        data: data,
      })
    });
  }

  handlePaginationChange = (current) => {
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
