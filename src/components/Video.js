import React, { Component } from 'react';
import App from './App.js';
import Thumbnails from './Thumbnails';
import Stars from './Stars';
import '../css/Video.css';

class Video extends Component {
    constructor(props){
        super(props);
    }

    starClicked(val){
        let ret = {
            key : this.props.v,
            val: val
        }
        this.props.StarWarsClicked(ret)
    }

    render() {

      return (
        <div className="Video row">
            <div className="col-sm-2"></div>
            <div id="frame" className="col-sm-8">
                <div className="row">
                <button type="button" onClick={() => this.props.BackWasClicked()}>Retour index</button>
                <div className="col-sm-12">{this.props.video.titre}</div>
                <div className="col-sm-12">
                <iframe width="560" height="315" title="my video"
                    src={this.props.src} 
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                </iframe>
                </div>
                <div className="video-size row">
                    <div className="size-50">
                        <Stars note={this.props.video.note.val} edit={true} StarWarsClicked={this.starClicked.bind(this)}/>
                    </div>
                    <div className="size-50 align-right">
                        {this.props.video.note.val.toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')}/5 avec {this.props.video.note.nb} votes
                    </div>
                  
                </div>
                <div className="col-sm-12">
                    {this.props.video.desc}
                    </div>
                </div>
            </div>
            <div id="nav" className="col-sm-2 side-video">
                <div>
                <Thumbnails side={true} />
                </div>
            </div>
        </div>
      );
    }
}
  
export default Video;