import React, { Component } from 'react';
import './App.css';
import Minesweeper from './Minesweeper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Minesweeper</h1>
          <h4> Created by somebody/somehow/maybe</h4>
        </header>
        <Minesweeper />
      </div>
    );
  }
}

export default App;
