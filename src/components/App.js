import React, { Component } from 'react';
import logo from '../logo.svg';
import Thumbnail from './Thumbnail';
import '../css/App.css';

class App extends Component {
  render() {
    let thumbnails = [];
    for(var i=0; i<10; i++){
      thumbnails.push(<Thumbnail vid="TLeGEqZBzqg" titre="titre" key={i}/>);
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Coucou mika</h1>
        </header>
        <div className="container">
          <div className="row">{thumbnails}</div>
        </div>
      </div>
    );
  }
}

export default App;
