import React, { Component } from 'react';
import MangaDetail from './MangaDetail';

class ShowPage extends Component {
  constructor(props) {
    super(props);

    this.id = props.match.params.id;

    this.state = {
      manga: { uri: '#' },
      chapters: [],
      downloads: {},
      zine: false,
    };
  }

  componentDidMount() {
    if (!this.id) { return; }

    this.fetchManga();
    this.fetchZine();
    this.fetchChapters();
    this.fetchDownloads();
  }

  fetchManga() {
    fetch(`http://localhost:8999/manga/${this.id}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Failed to fetch manga with id "${this.id}"`);
        }

        return res.json();
      })
      .then(manga => this.setState({manga}))
      .catch(e => console.error(e.message || e));
  }

  fetchZine() {
    fetch(`http://localhost:8999/zine/manga`)
      .then((res) => {
        if (!res.status === 200) {
          throw new Error('Failed to fetch zine');
        }

        return res.json();
      })
      .then(zine => this.setState({zine: zine.includes(this.id)}))
      .catch(e => console.error(e.message || e));
  }
  fetchChapters() {
    fetch(`http://localhost:8999/manga/${this.id}/chapters`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Failed to fetch chapters for manga with id "${this.id}"`);
        }

        return res.json();
      })
      .then(chapters => this.setState({chapters}))
      .catch(e => console.error(e.message || e));
  }

  fetchDownloads() {
    fetch(`http://localhost:8999/manga/${this.id}/downloads`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Failed to fetch downloads for manga with id "${this.id}"`);
        }

        return res.json();
      })
      .then(downloads => this.setState({downloads}))
      .catch(e => console.error(e.message || e));
  }

  render() {
    return (
      <MangaDetail
        id={this.id}
        manga={this.state.manga}
        chapters={this.state.chapters}
        downloads={this.state.downloads}
        zine={this.state.zine}
      />
    );
  }
}

export default ShowPage;
