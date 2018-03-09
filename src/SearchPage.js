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
      manga: []
    };
  }

  componentDidMount() {
    if (!this.q) { return; }

    this.fetchResults();
  }

  fetchResults(q) {
    fetch(`http://localhost:8999/search?q=${q || this.q}&site=mangareader`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch search results.');
        }

        return res.json();
      })
      .then(manga => this.setState({manga}))
      .catch(e => console.error(e.message || e));
  }

  render() {
    return (
      <div className="SearchPage">
        <div className="row">
          <Link className="button small" to={'/'}>Back</Link>
        </div>
        <Search q={this.q} onSubmit={this.fetchResults} />
        <SearchList manga={this.state.manga} />
      </div>
    );
  }
}

export default SearchPage;
