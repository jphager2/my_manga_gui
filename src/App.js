import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import logo from './logo.svg';
import Index from './Index';
import Show from './Show';
import './App.css';


class App extends Component {
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
              <Route exact path="/" component={Index} />
              <Route path="/manga/:id" component={Show} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
