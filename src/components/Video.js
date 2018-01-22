import React, { Component } from 'react';
import App from './App.js';

class Video extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: "https://www.youtube.com/embed/"+ this.props.video.id
        }
    }

    render() {

      return (
        <div className="Video">
            <div id="frame">
                <button type="button" onClick={() => this.props.BackWasClicked()}>Retour index</button>
                <div>{this.props.video.titre}</div>
                <iframe width="560" height="315" title="my video"
                    src={this.state.url} 
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                </iframe>
                <div>{this.props.video.desc}</div>
            </div>
            <div id="nav">
                <App />
            </div>
        </div>
      );
    }
}
  
export default Video;