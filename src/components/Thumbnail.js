import React, { Component } from 'react';
import '../css/Thumbnail.css';
import Stars from './Stars';

class Thumbnail extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: "https://img.youtube.com/vi/"+ this.props.video.id +"/0.jpg"
        }
    }

    buildTitle(title){
        if(title.length > 40) {
            title = title.substring(0,40)
        }
        return title;
    }

    render() {
        let overlay = null;
        if(this.props.main){
            overlay = <div className="overlay">
                <div className="text">
                    {this.buildTitle(this.props.video.titre)}
                </div>
                <div className="star">
                    <Stars note={this.props.video.note.val}/>
                </div>
            </div>;
        }
      return (
        <div className={"Thumbnail "+ (this.props.main ?"col-sm-4 col-md-3 col-lg-2":"")} onClick={() => this.props.ThumbWasClicked(this.props)}>
            <div className="thumb" >
            <img className="thumb-img" src={this.state.url} alt="thumbnail"/>
            {overlay}
            </div>
            <div className="align-center">{this.props.video.titre}</div>
            
        </div>
      );
    }
}
  
export default Thumbnail;