import React, { Component } from 'react';
import MangaList from './MangaList';
import Search from './Search';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manga: [],
      zine: []
    };
  }

  componentDidMount() {
    this.fetchManga();
    this.fetchZine();
  }

  fetchManga() {
    fetch(`http://localhost:8999/manga`)
      .then((res) => {
        if (!res.status === 200) {
          throw new Error('Failed to fetch manga');
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
      .then(zine => this.setState({zine}))
      .catch(e => console.error(e.message || e));
  }

  render() {
    return (
      <div className="IndexPage">
        <Search />
        <MangaList manga={this.state.manga} zine={this.state.zine} />
      </div>
    );
  }
}

export default IndexPage;
