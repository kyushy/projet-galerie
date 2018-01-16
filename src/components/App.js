import React, { Component } from 'react';
import logo from '../logo.svg';
import Thumbnail from './Thumbnail';
import base from '../base.js';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      videos : {}
    };
  }

  componentWillMount() {
    //alert("toto")
    // this runs right before the <App> is rendered
    this.ref = base.syncState("videos", {
      context: this,
      state: 'videos'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {

    let list = Object.keys(this.state.videos).map((key, index) => 
    <Thumbnail vid={this.state.videos[key].id} titre={this.state.videos[key].titre} key={index}/>)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Coucou mika</h1>
        </header>
        <div className="container">
          <div className="row">{list}</div>
        </div>
      </div>
    );
  }
}

export default App;
