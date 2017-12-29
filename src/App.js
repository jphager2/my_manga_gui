import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import logo from './logo.svg';
import MangaList from './MangaList';
import MangaDetail from './MangaDetail';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mangaList: [],
      manga: { uri: '#' },
    };
  }

  fetchMangaList() {
    return fetch('http://localhost:8999/manga')
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch manga');
        }
        return res.json()
      })
      .then((json) => {
        this.setState({mangaList: json});
      })
      .catch((e) => {
        console.error(e.message || e);
        return [];
      });
  }

  fetchManga(id) {
    return this.fetchMangaList()
      .then(() => {
        const manga = this.state.mangaList.find(m => m.id == id);
        this.setState({manga});
      })
      .catch((e) => {
        console.error(e.message || e);
        return { url: '#' };
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MyManga</h1>
        </header>
        <div className="App-route">
          <Router>
            <div>
              <Route
                exact path="/"
                render={(routeProps) => {
                  this.fetchMangaList();

                  return (
                    <MangaList manga={this.state.mangaList} />
                  );
                }}
              />
              <Route
                path="/manga/:id"
                render={(routeProps) => {
                  this.fetchManga(routeProps.match.params.id);

                  return (
                    <MangaDetail manga={this.state.manga} />
                  );
                }}
              />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
