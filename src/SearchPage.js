import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Search from './Search';
import SearchList from './SearchList';
import { parseQuery } from './utils';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.q = parseQuery(this.props.location.search).q;
    this.fetchResults = this.fetchResults.bind(this);
    this.state = {
      results: [],
      manga: [],
      zine: []
    };
  }

  componentDidMount() {
    if (!this.q) { return; }

    this.fetchResults();
    this.fetchManga();
    this.fetchZine();
  }

  fetchResults(q) {
    fetch(`http://localhost:8999/search?q=${q || this.q}&site=mangareader`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch search results.');
        }

        return res.json();
      })
      .then(results => this.setState({results}))
      .catch(e => console.error(e.message || e));
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
      <div className="SearchPage">
        <div className="row">
          <Link className="button small" to={'/'}>Back</Link>
        </div>
        <Search q={this.q} onSubmit={this.fetchResults} />
        <SearchList results={this.state.results} manga={this.state.manga} zine={this.state.zine} />
      </div>
    );
  }
}

export default SearchPage;
