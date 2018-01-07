import React, { Component } from 'react';
import MangaList from './MangaList';
import Search from './Search';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manga: []
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <div className="IndexPage">
        <Search />
        <MangaList manga={this.state.manga} />
      </div>
    );
  }
}

export default IndexPage;
