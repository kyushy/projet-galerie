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
    let thumbnails = Object.keys(this.props.videos).reverse().map((key, index) =>
    <Thumbnail idParent={this.props.id} video={this.props.videos[key]} v={key} key={index} main={!this.props.side} ThumbWasClicked={this.showVideo.bind(this)}/>)
    
    return (
      <div className="Thumbnails">

        <div className="container">
          <div className="row">{thumbnails}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Thumbnails);
