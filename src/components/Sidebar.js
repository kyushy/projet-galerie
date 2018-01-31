import React, { Component } from 'react';
import '../css/Sidebar.css';
import {withRouter} from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }


  click(){
    this.props.history.push(`/`);
  }

  render() {
    return (
<div className="nav-side-menu">
<div className="brand">MBDS</div>
    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
  
        <div className="menu-list">
  
            <ul id="menu-content" className="menu-content collapse out">
                <li onClick={()=>this.click()}>
                  <i className="fa fa-home fa-lg"></i> Gallerie vidéo
                </li>
                
                <li data-toggle="modal" data-target="#videoModal">
                  <i className="fa fa-youtube-play fa-lg"></i> Ajout de vidéo
                </li>

            </ul>
     </div>
</div>
    );
}
}

export default withRouter(Sidebar);