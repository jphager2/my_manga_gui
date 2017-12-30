import React, { Component } from 'react';
import MangaDetail from './MangaDetail';

class Show extends Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.id;

    this.state = {
      manga: { uri: '#' },
      chapters: [],
    };
  }

  componentDidMount() {
    if (!this.id) { return; }

    this.fetchManga();
    this.fetchChapters();
  }

  fetchManga() {
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

  fetchChapters() {
    fetch(`http://localhost:8999/manga/${this.id}/chapters`)
      .then((res) => {
        if (!res.status == 200) {
          throw new Error(`Failed to fetch chapters for manga with id "${this.id}"`);
        }

        return res.json();
      })
      .then(chapters => this.setState({chapters}))
      .catch(e => console.error(e.message || e));
  }

  render() {
    return (
      <MangaDetail
        manga={this.state.manga}
        chapters={this.state.chapters}
      />
    );
  }
}

export default Show;
