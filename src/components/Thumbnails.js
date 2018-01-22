import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Thumbnail from './Thumbnail';
import Video from './Video.js';
import base from '../base.js';

class Thumbnails extends Component {
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

  showVideo(key){
    console.log(key);
    var url = "https://www.youtube.com/embed/"+ key.id;
    ReactDOM.render(<Video video={key} src={url}/>, 
      document.getElementById('root'));
  }

  render() {

    let thumbnails = Object.keys(this.state.videos).map((key, index) =>
    <Thumbnail video={this.state.videos[key]} key={index} main={!this.props.side} ThumbWasClicked={this.showVideo.bind(this)}/>)
    
    return (
      <div className="Thumbnails">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Galerie MBDS</h1>
        </header>*/}
        <div className="container">
          <div className="row">{thumbnails}</div>
        </div>
      </div>
    );
  }
}

export default Thumbnails;
