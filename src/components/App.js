import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import Thumbnail from './Thumbnail';
import Video from './Video.js';
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
    // this runs right before the <App> is rendered
    this.ref = base.syncState("videos", {
      context: this,
      state: 'videos'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  showVideo(key){
    ReactDOM.render(<Video vid={this.state.videos[key].id} titre={this.state.videos[key].titre} desc={this.state.videos[key].desc}/>, 
      document.getElementById('root'));
  }

  render() {

    let thumbnails = Object.keys(this.state.videos).map((key, index) => 
    <Thumbnail vid={this.state.videos[key].id} titre={this.state.videos[key].titre} key={index} ThumbWasClicked={this.showVideo.bind(this)}/>)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Galerie MBDS</h1>
        </header>
        <div className="container">
          <div className="row">{thumbnails}</div>
        </div>
      </div>
    );
  }
}

export default App;
