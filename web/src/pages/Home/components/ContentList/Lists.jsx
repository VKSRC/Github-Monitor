import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Pagination } from '@icedesign/base';
import Item from './Item';


const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      title: `Account/Project_name`,
      time: `2018-06-1${index} 10:12:00`,
      citation: index + 1,
      score: index + 90,
      subject: '自然语言',
      count: 20,
    };
  });
};

export default class Lists extends Component {
  static displayName = 'Lists';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };

  render() {
    const data = getData();
    return (
      <IceContainer>
        <Item />
        <Item />
        <Item />
        <Item />

        <Pagination
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handlePaginationChange}
        />
      </IceContainer>
    );
  }
}


const  styles = {
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
