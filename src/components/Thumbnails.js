import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Thumbnail from './Thumbnail';
import Video from './Video.js';
import base from '../base.js';

class Thumbnails extends Component {
  constructor(props) {
    super(props);
    
    this.starClicked = this.starClicked.bind(this);

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

  starClicked(val){
    const videos = {...this.state.videos};
    console.log(this.state.videos);
    videos[val.key].note.val = ((videos[val.key].note.val * videos[val.key].note.nb) + val.val )/ (videos[val.key].note.nb+1);
    videos[val.key].note.nb ++
    this.setState({
      videos : videos
    })
       console.log(this.state.videos);
  }

  showVideo(key){
    console.log(key);
    var url = "https://www.youtube.com/embed/"+ key.video.id;
    ReactDOM.render(<Video video={key.video} v={key.v} src={url} StarWarsClicked={this.starClicked.bind(this)}/>, 
      document.getElementById('root'));
  }

  render() {

    let thumbnails = Object.keys(this.state.videos).map((key, index) =>
    <Thumbnail video={this.state.videos[key]} v={key} key={index} main={!this.props.side} ThumbWasClicked={this.showVideo.bind(this)}/>)
    
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
