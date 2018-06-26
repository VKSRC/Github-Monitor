import React, { Component } from 'react';
import ContentList from './components/ContentList';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <ContentList />
      </div>
    );
  }
}
