import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/Sidebar.css';
import Link from 'react-router-dom/Link';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
<div className="nav-side-menu">
<div className="brand">MBDS</div>
    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
  
        <div className="menu-list">
  
            <ul id="menu-content" className="menu-content collapse out">
                <li>
                <Link to='/'>
                  <i className="fa fa-home fa-lg"></i> Gallerie vidéo
                  </Link>
                </li>
                
                <li>
                <a data-toggle="modal" data-target="#videoModal">
                  <i className="fa fa-youtube-play fa-lg"></i> Ajout de vidéo
                  </a>
                </li>

            </ul>
     </div>
</div>
    );
}
}

export default Sidebar;