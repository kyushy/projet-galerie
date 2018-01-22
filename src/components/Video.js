import React, { Component } from 'react';
import App from './App.js';
import Thumbnails from './Thumbnails';
import '../css/Video.css';

class Video extends Component {
    constructor(props){
        super(props);
    }

    render() {

      return (
        <div className="Video row">
            <div className="col-sm-2"></div>
            <div id="frame" className="col-sm-8">
                <button type="button" onClick={() => this.props.BackWasClicked()}>Retour index</button>
                <div>{this.props.video.titre}</div>
                <iframe width="560" height="315" title="my video"
                    src={this.props.src} 
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                </iframe>
                <div>{this.props.video.desc}</div>
            </div>
            <div id="nav" className="col-sm-2 side-video">
                <Thumbnails side={true} />
            </div>
        </div>
      );
    }
}
  
export default Video;