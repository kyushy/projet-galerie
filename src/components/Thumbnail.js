import React, { Component } from 'react';

class Thumbnail extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: "https://img.youtube.com/vi/"+ this.props.vid +"/0.jpg"
        }
    }

    render() {
      return (
        <div className="Thumbnail col-sm-4 col-md-3 col-lg-2" onClick={() => this.props.ThumbWasClicked(this.props.vid)}>
            <img src={this.state.url} alt="thumbnail" width="150" height="150"/>
            <div>{this.props.titre}</div>
        </div>
      );
    }
}
  
export default Thumbnail;