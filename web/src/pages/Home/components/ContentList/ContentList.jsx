import React, { Component } from 'react';
import Filter from './Filter';
import Lists from './Lists';

export default class ContentList extends Component {
  static displayName = 'ContentList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.handleFilterStatusChange = this.handleFilterStatusChange.bind(this);
    this.handleFilterLanguageChange = this.handleFilterLanguageChange.bind(this);

    this.state = {
      status: '全部',
      language: '全部',
    };
  }

  handleFilterStatusChange(status) {
    this.setState({
      status: status,
    });
  }

  handleFilterLanguageChange(language) {
    this.setState({
      language: language,
    });
  }

  render() {
    return (
      <div>
        <Filter
          onStatusChange={this.handleFilterStatusChange}
          onLanguageChange={this.handleFilterLanguageChange}
        />
        <Lists
          status={this.state.status}
          language={this.state.language}
        />
      </div>
    );
  }
}
