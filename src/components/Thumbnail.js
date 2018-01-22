import React, { Component } from 'react';
import '../css/Thumbnail.css';

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

    buildStar(val){
        
        let res = "fa fa-star "
        if(val <= this.props.video.note.val) {
            console.log(this.props.video.note.val)
            console.log(val)
            return res + "star-checked"
        }
        return res
    }   

    render() {
      return (
        <div className="Thumbnail col-sm-4 col-md-3 col-lg-2" onClick={() => this.props.ThumbWasClicked(this.props.video)}>
            <div className="thumb" >
            <img className="thumb-img" src={this.state.url} alt="thumbnail"/>
            <div className="overlay">
                <div className="text">
                    {this.buildTitle(this.props.video.titre)}
                </div>
                <div className="star">
                    <span className={this.buildStar(1)}></span>
                    <span className={this.buildStar(2)}></span>
                    <span className={this.buildStar(3)}></span>
                    <span className={this.buildStar(4)}></span>
                    <span className={this.buildStar(5)}></span>
                </div>
            </div>
            </div>
            <div>{this.props.video.titre}</div>
            
        </div>
      );
    }
}
  
export default Thumbnail;