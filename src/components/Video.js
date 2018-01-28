import React, { Component } from 'react';
import App from './App.js';
import logo from '../logo.svg';
import Thumbnails from './Thumbnails';
import Stars from './Stars';
import base from '../base.js';
import '../css/Video.css';
import Sidebar from './Sidebar';
import AddVideo from './AddVideo';

class Video extends Component {
    constructor(props){       
        super(props);
        this.state = {
            videos : {},
            video : {desc: "",
            id: "",
            note: {
            nb: 0,
            val: 0},
            titre: ""}
          };
    }

    
  componentDidMount() {
    this.ref = base.syncState("videos", {
      context: this,
      state: 'videos',
      then(data){
        this.setState({
            video: this.state.videos[this.props.match.params.video]
        })
      }
    });
    
  }

  componentWillReceiveProps(newProps){
    this.setState({
        video: this.state.videos[newProps.match.params.video]
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

    starClicked(val){
        const {match} = this.props;
        const videos = {...this.state.videos};
        videos[match.params.video].note.val = ((videos[match.params.video].note.val * videos[match.params.video].note.nb) 
        + val )/ (videos[match.params.video].note.nb+1);
        videos[match.params.video].note.nb ++
        this.setState({
          videos : videos,
          video: this.state.videos[this.props.match.params.video]
        })
      }

    render() { 
        
        let url = "https://www.youtube.com/embed/"+ this.state.video.id
        console.log(this.state.videos)
       
      return (
        <div className="Video">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Galerie MBDS</h1>
            </header>
        <div className="row">
            <Sidebar/>
            <div  className="container decale-toi-v row">
            <div id="frame" className="col-sm-8">
            <div className="row">
                <div className="col-sm-12">{this.state.video.titre}</div>
                <div className="col-sm-12">
                <iframe width="560" height="315" title="my video"
                    src={url} 
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                </iframe>
                </div>
                <div className="video-size row padding-top-7">
                    <div className="size-50">
                        <Stars note={this.state.video.note.val} edit={true} StarWarsClicked={this.starClicked.bind(this)}/>
                    </div>
                    <div className="size-50 align-right">
                        {this.state.video.note.val.toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')}/5 avec {this.state.video.note.nb} votes
                    </div>
                  
                </div>
                <div className="col-sm-12 padding-top-15">
                    {this.state.video.desc}
                    </div>
                </div>
            </div>
            <div className="col-sm-2"></div>
            <div id="nav" className="col-sm-2 side-video">
                <div>
                <Thumbnails videos={this.state.videos} side={true} />
                </div>
            </div>
            </div>
        </div>
        <AddVideo/>
        </div>
      );
    }
}
  
export default Video;