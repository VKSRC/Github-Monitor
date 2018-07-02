import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {config} from '../../../../config'
import axios from 'axios'

const data = [
  {
    label: '状态',
    value: [
      '全部',
      '待确认',
      '待处理',
      '已处理',
      '无风险',
    ],
  },
  {
    label: '类型',
    value: ['全部'],
  },
];

export default class Filter extends Component {
  static displayName = 'Filter';

  constructor(props) {
    super(props);
    this.state = {
      status: '全部',
      language: '全部',
    };
  }

  componentDidMount() {
    axios(`${config.API_URL}/api/language`).then((response) => {
      if (response) {
        response.data.map((item, index) => {
          if (item[0]) data[1]['value'].push(item[0]);

          // 为了获取数据后重新渲染一次
          this.setState({
            status: '全部',
          })
        });
      }
    });
  }

  handleClick = (value) => {
    console.log(value);
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <IceContainer title="Github查询">
        <div style={styles.filterContent}>
          {data.map((item, index) => {
            const lastItem = index === data.length - 1;
            const lastItemStyle = lastItem ? { marginBottom: 0 } : null;
            return (
              <div
                style={{ ...styles.filterItem, ...lastItemStyle }}
                key={index}
              >
                <div style={styles.filterLabel}>{item.label}:</div>
                <div style={styles.filterList}>
                  {item.value.map((text, idx) => {
                    let activeStyle = null;
                    if (item.label === '状态') {
                      activeStyle = this.state.status === text ? styles.active : null;
                    } else if (item.label === '类型') {
                      activeStyle = this.state.language === text ? styles.active : null;
                    }
                    return (
                      <span
                        onClick={() => this.handleClick(text)}
                        style={{ ...styles.filterText, ...activeStyle }}
                        key={idx}
                      >
                        {text}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    height: '28px',
    marginBottom: '20px',
  },
  filterLabel: {
    width: '60px',
    fontSize: '15px',
    fontWeight: '450',
  },
  filterText: {
    fontSize: '15px',
    marginRight: '15px',
    cursor: 'pointer',
  },
  active: {
    minWeight: '60px',
    borderRadius: '20px',
    padding: '5px 15px',
    background: '#2784fc',
    color: '#fff',
  },
};
