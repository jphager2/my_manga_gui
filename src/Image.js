import React, { Component } from 'react';
import defaultCover from './default_cover.png';

class Image extends Component {
  constructor(props) {
    super(props);

    this.onError = this.onError.bind(this);
    this.state = {
      src: this.props.src || defaultCover
    };
  }

  onError() {
    this.setState({src: this.props.fallbackSrc || defaultCover});
  }

  render() {
    return (
      <img alt={this.props.alt} src={this.state.src} onError={this.onError} />
    );
  }
}

export default Image;
