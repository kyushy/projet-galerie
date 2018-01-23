import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Thumbnail from './Thumbnail';
import Video from './Video.js';
import {withRouter} from "react-router-dom";


class Thumbnails extends Component {
  constructor(props) {
    super(props);
  }


  showVideo(key){
      this.props.history.push('/videos/'+key.v)
  }

  render() {
    let thumbnails = Object.keys(this.props.videos).map((key, index) =>
    <Thumbnail video={this.props.videos[key]} v={key} key={index} main={!this.props.side} ThumbWasClicked={this.showVideo.bind(this)}/>)
    
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

export default withRouter(Thumbnails);
