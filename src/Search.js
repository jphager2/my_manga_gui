import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.enterWillSubmit = this.enterWillSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.onSubmit= this.props.onSubmit;
    this.state = {
      q: this.props.q
    };
  }

  enterWillSubmit(e) {
    if (e.keyCode !== 13) { return; }

    this.submit();
  }

  submit(e) {
    const q = document.querySelector('.Search-input').value;

    if (!q) { return; }

    window.location.hash = `/search?q=${q}`;
    if (this.onSubmit) { this.onSubmit(q); }
  }

  render() {
    return (
      <div className="Search">
        <div className="row">
          <input className="Search-input" defaultValue={this.state.q} onKeyDown={this.enterWillSubmit} />
          <button className="Search-submit button" type="submit" onClick={this.submit}>Find!</button>
        </div>
      </div>
    );
  }
}

export default Search;
