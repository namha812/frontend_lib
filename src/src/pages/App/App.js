import React, { Component } from 'react';
import './App.scss';
import Routes from '../../rootRouter'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;

