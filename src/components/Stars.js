import React, { Component } from 'react';
import '../css/Stars.css';

class Stars extends Component {
    constructor(props){
        super(props);
        this.state = {
            starhover : 0
        }
    }

    handleHover(val){
        if(this.props.selected === undefined){
        this.setState({
            starhover: val
        });
    }
    }

    componentWillReceiveProps(){
        if(this.props.selected === undefined){
            this.setState({
                starhover: 0
            });
    }
}

    starChecked(val){
        let star = "fa fa-star "
        if(this.props.edit){
            if(this.state.starhover >= val){
                return star + "star-selected"
            }
            else if(val <= this.props.note && this.state.starhover === 0){
                return star+ "star-checked"
            }
        }
        else if (this.props.selected !== undefined && val <= this.props.selected){
            return star + "star-selected"
        }
        else if (this.props.selected === undefined && val <= this.props.note){
            return star + "star-checked"
        }
        return star
    }

    starClicked(val){
        if(this.props.edit){
            this.props.StarWarsClicked(val)
        }
    }
      

    render() {
        let list = [];
        for (let i = 1; i <= 5; i++) {
            list.push(<span key={i} className={this.starChecked(i)} 
            onMouseEnter={() => this.handleHover(i)} 
            onMouseLeave={() => this.handleHover(0)}
            onClick={() => this.starClicked(i)}></span>);
        }

      return (
        <div>
            {list}
        </div>
      );
    }
}
  
export default Stars;