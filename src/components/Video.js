import React, { Component } from 'react';

class Video extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: "https://www.youtube.com/embed/"+ this.props.video.id
        }
    }

    render() {
      return (
        <div>
            <div>{this.props.video.titre}</div>
            <iframe width="560" height="315" 
                src={this.state.url} 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
            <div>{this.props.video.desc}</div>
        </div>
      );
    }
}
  
export default Video;