import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import Thumbnails from './Thumbnails';
import base from '../base.js';
import '../css/App.css';
import Sidebar from './Sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos : {}
    };
  }

  
  componentWillMount() {
    this.ref = base.syncState("videos", {
      context: this,
      state: 'videos'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Galerie MBDS</h1>
        </header>
        <div className="row">
        <Sidebar/>
        <div className="container decale-toi">
          
          <Thumbnails videos={this.state.videos} side={false}/>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
