import React, { Component } from 'react';
import MangaDetail from './MangaDetail';

class Show extends Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.id;

    this.state = {
      manga: { uri: '#' }
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8999/manga/${this.id}`)
      .then((res) => {
        if (!res.status == 200) {
          throw new Error(`Failed to fetch manga with id "${this.id}"`);
        }

        return res.json();
      })
      .then(manga => this.setState({manga}))
      .catch(e => console.error(e.message || e));
  }

  render() {
    return (
      <MangaDetail manga={this.state.manga} />
    );
  }
}

export default Show;
