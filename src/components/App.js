import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import Thumbnails from './Thumbnails';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Galerie MBDS</h1>
        </header>*/}
        <div className="container">
          <Thumbnails side={false}/>
        </div>
      </div>
    );
  }
}

export default App;
