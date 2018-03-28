import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import IndexPage from './IndexPage';
import ShowPage from './ShowPage';
import SearchPage from './SearchPage';
import OnedriveOauth from './OnedriveOauth';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MyManga</h1>
          <OnedriveOauth />
        </header>
        <div className="App-route">
          <Router>
            <div>
              <Route exact path="/" component={IndexPage} />
              <Route path="/manga/:id" component={ShowPage} />
              <Route path="/search" component={SearchPage} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
