import React, { Component } from 'react';
import App from './App.js';
import logo from '../logo.svg';
import Thumbnails from './Thumbnails';
import Stars from './Stars';
import base from '../base.js';
import '../css/Video.css';
import Sidebar from './Sidebar';
import AddVideo from './AddVideo';
import {withRouter} from "react-router-dom";

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
            titre: ""},
            edit: false
          };
          this.handleChangeDesc = this.handleChangeDesc.bind(this);
          this.handleChangeTitre = this.handleChangeTitre.bind(this);
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

    modifButtonClicked(){
        this.setState({
            edit : true
        })
    }

    validButtonClicked(){

        const {match} = this.props;
        const videos = {...this.state.videos};
        videos[match.params.video] = this.state.video
        this.setState({
          videos : videos,
          edit : false
        })
    }

    deleteClicked(){

        const {match} = this.props;
        const videos = {...this.state.videos};
        videos[match.params.video] = null
        this.setState({
          videos : videos
        })
        this.props.history.push(`/`);
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
        let notes = localStorage.getItem('notes')
        if(notes === null){
            notes = {}
        }
        else{
            notes = JSON.parse(notes)
        }
       
        notes[match.params.video] = val
        localStorage.setItem('notes', JSON.stringify(notes))
      }
      handleChangeDesc(event) {
        const video = this.state.video
        video.desc = event.target.value
        this.setState({video : video});
    }
    handleChangeTitre(event) {
        const video = this.state.video
        video.titre = event.target.value
        this.setState({video : video});
    }

    render() { 
        
        let url = "https://www.youtube.com/embed/"+ this.state.video.id

        let notes = localStorage.getItem('notes')
        let note
        if(notes !== null)
            note = JSON.parse(notes)[this.props.match.params.video]
        let star = (note!==undefined ? 
        <Stars note={this.state.video.note.val} edit={false} selected={note}/>:
        <Stars note={this.state.video.note.val} edit={true} StarWarsClicked={this.starClicked.bind(this)}/>)
       
       let titre = (this.state.edit ? 
       <div className="col-sm-12">
       <input type="text" className="form-control col-sm-12" id="titre" name="titre" value={this.state.video.titre} onChange={this.handleChangeTitre} title="Entrer le titre de la video"
                                /></div>
        :<h4 className="col-sm-12">{this.state.video.titre}</h4>)

        let desc = (this.state.edit ?
        <textarea className="form-control" id="desc" name="desc" value={this.state.video.desc} onChange={this.handleChangeDesc}
                                ></textarea>
                                :this.state.video.desc)
        let blueButton = (this.state.edit? <button type="button" className="btn btn-primary width-100" onClick={()=>this.validButtonClicked()}>Valider</button> 
        : <button type="button" className="btn btn-primary width-100" onClick={()=>this.modifButtonClicked()}>Modifier</button>)

      return (
          
        <div className="Video back-color">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Galerie MBDS</h1>
            </header>
        <div className="row">
            <Sidebar/>
            <div  className="container decale-toi-v row">
            <div id="frame" className="col-sm-8">
            <div className="row">
                {titre}
                <div className="col-sm-12">
                <iframe width="560" height="315" title="my video"
                    src={url} 
                    frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                </iframe>
                </div>
                <div className="video-size row padding-top-7">
                    <div className="size-50">
                        {star}
                    </div>
                    <div className="size-50 align-right">
                        {this.state.video.note.val.toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')}/5 avec {this.state.video.note.nb} votes
                    </div>
                  
                </div>
                <div className="col-sm-12 padding-top-15">
                    {desc}
                    </div>
                </div>
            </div>
            <div className="col-sm-2">
                {blueButton}
                <button type="button" className="btn btn-danger width-100 margin-top-15" data-toggle="modal" data-target=".bd-modal-sm">Supprimer</button>
            </div>
            <div id="nav" className="col-sm-2 side-video">
                <div>
                <Thumbnails videos={this.state.videos} side={true} />
                </div>
            </div>
            </div>
        </div>
        <AddVideo/>
        <div className="modal fade bd-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
                <div className="modal-content color-normal">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Supprimer la vidéo ?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <img src={`https://img.youtube.com/vi/${this.state.video.id}/0.jpg`} className="width-100" alt="video à supprimer"/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        <button type="button" className="btn btn-danger"  data-dismiss="modal" onClick={()=>this.deleteClicked()}>Supprimer</button>
                    </div>
                    </div>
            </div>
        </div>
        </div>
      );
    }
}
  
export default  withRouter(Video);