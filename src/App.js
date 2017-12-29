import React, { Component } from 'react';
import logo from './logo.svg';
import MangaList from './MangaList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      manga: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8999/manga')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch manga');
        }
        return res.json()
      })
      .then((json) => {
        this.setState({manga: json});
      })
      .catch((e) => {
        console.error(e.message || e);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MyManga</h1>
        </header>
        <div className="App-manga-list">
          <MangaList manga={this.state.manga} />
        </div>
      </div>
    );
  }
}

export default App;
