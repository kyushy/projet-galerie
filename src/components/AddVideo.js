import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import base from '../base.js';
import '../css/App.css';
import Sidebar from './Sidebar';
import {withRouter} from "react-router-dom";

class AddVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video : {desc: '', id: '', note:{nb:0, val:0}, titre:""},
      url:""
    };

    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeTitre = this.handleChangeTitre.bind(this);
  }

  addVideo(){
    base.push('videos', {
        data: this.state.video
      }).then(() => {
        this.props.history.push('/');
      }).catch(err => {
        //handle error
      });   
  }

    handleChangeDesc(event) {
        const video = this.state.video
        video.desc = event.target.value
        this.setState({video : video});
    }
    handleChangeUrl(event) {
        const video = this.state.video
        let url = event.target.value.split("v=")[1]
        if(url!=undefined){
            video.id = url.split("&")[0]
            this.setState({
                video : video
            });
        }
        this.setState({
            url: event.target.value
        })
    }
    handleChangeTitre(event) {
        const video = this.state.video
        video.titre = event.target.value
    this.setState({video : video});
    }

  render() {
    return (
      

    <div className="modal fade" id="videoModal" tabIndex="-1" role="dialog" aria-labelledby="addVideoModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addVideoModalLabel">Ajout d'une video</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="well">
                            <div className="form-group">
                                <label htmlFor="url" className="control-label">Url de la video</label>
                                <input type="text" className="form-control" id="url" name="url" value={this.state.url} onChange={this.handleChangeUrl} title="Entrer l'url de la video" placeholder="https://www.youtube.com/watch?v=6Ju9TNFm9kc"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="titre" className="control-label">Titre</label>
                                <input type="text" className="form-control" id="titre" name="titre" value={this.state.video.titre} onChange={this.handleChangeTitre} title="Entrer le titre de la video"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="desc" className="control-label">Description</label>
                                <textarea className="form-control" id="desc" name="desc" value={this.state.video.desc} onChange={this.handleChangeDesc}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-success btn-block" onClick={()=> this.addVideo()}>Login</button>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default withRouter(AddVideo);
