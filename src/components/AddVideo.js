import React, { Component } from 'react';
import base from '../fire.js';
import cat from '../catB.svg';
import '../css/App.css';
import '../css/AddVideo.css';
import Sidebar from './Sidebar';
import {withRouter} from "react-router-dom";

class AddVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video : {desc: '', id: '', note:{nb:0, val:0}, titre:""},
      url:"",
      already : false,
      pic : "",
      list : false,
      playlist : {id : "", tot:0,videos : []},
      done : false,
      loading:false
    };

    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
    this.handleChangeTitre = this.handleChangeTitre.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
  }

  addVideo(){
    base.push('videos', {
        data: this.state.video
      }).then(newLocation => {
        this.props.history.push(`/videos/${newLocation.key}`);
        this.setState({
            video : {desc: '', id: '', note:{nb:0, val:0}, titre:""},
            pic : ""
        })
      }).catch(err => {
        //handle error
      });   
  }

  addVideoList(video){
    base.push('videos', {
        data: video
      }).then(newLocation => {
        //this.props.history.push(`/videos/${newLocation.key}`);
        console.log("count")
      }).catch(err => {
        //handle error
      });    
  }

  loadInfo(){
    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.state.video.id}&key=AIzaSyDxDJWgyaqEndd39Z1eMwD9PsAID6N7fuo`;

    fetch(url)
        .then((responseJSON) => {
            responseJSON.json()
            .then((res) => {
                if(res.pageInfo.totalResults === 1){
                    const video = this.state.video
                    let videoY = res.items[0].snippet
                    video.desc = videoY.description
                    video.titre = videoY.title
                    this.setState({
                        video : video,
                        pic : videoY.thumbnails.standard.url
                    })
                }
                else {
                    const video = this.state.video
                    video.desc = ""
                    video.titre = ""
                    this.setState({
                        video : video,
                        pic : ""
                    })
                }
            });
        })
        .catch(function (err) {
            console.log(err);
    });
  }

  loadInfoList(pageToken){
    if(this.state.playlist.id !== ""){
        let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${this.state.playlist.id}&key=AIzaSyDxDJWgyaqEndd39Z1eMwD9PsAID6N7fuo`
        let tot = 0
        const playlist = this.state.playlist
        
        if(pageToken){
            url += `&pageToken=${pageToken}`
        }
        else{
            playlist.videos = []
        }
        fetch(url)
            .then((responseJSON) => {
                if(responseJSON.ok)
                    return responseJSON.json();
                throw new Error('Network response was not ok.');
                }
                )
                .then((res) => {
                    this.setState({
                        loading : true
                    })
                    playlist.tot = res.pageInfo.totalResults
                    if(res.nextPageToken){
                        this.loadInfoList(res.nextPageToken)
                    }
                        for (let i = 0; i < res.items.length; i++) {  
                            base.fetch('videos', {
                                context: this,
                                asArray:true,
                                queries : {
                                    orderByChild:'id',
                                    equalTo: res.items[i].snippet.resourceId.videoId
                                }
                            }).then(data => {
                                    if(data.length === 0){
                                        let video = {desc: '', id: '', note:{nb:0, val:0}, titre:""}
                                        video.id = res.items[i].snippet.resourceId.videoId
                                        video.desc = res.items[i].snippet.description
                                        video.titre = res.items[i].snippet.title
                                        playlist.videos.push(video)
                                    }                          
                            }).catch(error => {
                                //handle error
                            })
                        }
                        if(res.nextPageToken === undefined){
                            this.setState({
                                playlist : playlist,
                                done:true,
                                loading:false
                            })    
                        }                                
                })
            .catch(function (err) {
                console.log(err);
        });
    }
  }

    handleChangeDesc(event) {
        const video = this.state.video
        video.desc = event.target.value
        this.setState({video : video});
    }
    handleChangeUrl(event) {
        const video = this.state.video
        let url = event.target.value.split("v=")[1]
        if(url === undefined){
            url = event.target.value.split("youtu.be/")[1]
        }
        if(url!=undefined){
            let tmp = url.split("&")[0]
            video.id = tmp.split("?")[0]
            base.fetch('videos', {
                context: this,
                asArray:true,
                queries : {
                    orderByChild:'id',
                    equalTo: video.id
                }
              }).then(data => {
                    this.setState({
                        already : data.length !== 0
                    });
                  
              }).catch(error => {
                //handle error
              })
            this.setState({
                video : video
            });
        }
        else {
            video.id = ""
            this.setState({
                video : video,
                already : false
            });
        }
        this.setState({
            url: event.target.value
        })
    }
    handleChangeList(event) {
        let url = event.target.value.split("list=")[1]
        if(url!=undefined){
            let tmp = url.split("&")[0]
            this.setState({
                playlist : {id : tmp.split("?")[0], tot:0,videos : []},
                done : false
            });
        }
        else {
            this.setState({
                playlist : {id : "", tot:0, videos : []},
                done:false
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

    handleChangeCheck(event){
        this.setState({
            list : !this.state.list,
            url:"",
            video : {desc: '', id: '', note:{nb:0, val:0}, titre:""},
            pic : "",
            already : false,
            playlist : {id : "", tot:0,videos : []},
            done:false
        })
    }
    

  render() {
      
      let sendButton = null
      let alert = null
      let pic = null
      let oneOrMore = null
      let loading = null
      let pics = []

      if(this.state.done && this.state.playlist.videos.length > 0){
        for(let i=0; i < this.state.playlist.videos.length; i++){
            pics.push(<div className="col-sm-4">
                <div className="thumb">
                <img className="thumb-img" key={i} src={`https://i.ytimg.com/vi/${this.state.playlist.videos[i].id}/default.jpg`} alt="logo" />
                <div className="overlay red">
                <div className="text-center">
                    Supprimer la vidéo ?
                </div>
                </div>
                </div>
                </div>)
        }
        }  
      
      if(this.state.loading){
            loading = <img src={cat} style={{width:"50%"}} alt="logo" />
        }
        else if (this.state.done){
            loading = <div>
                <div>
                Chargement de {this.state.playlist.videos.length} vidéos parmi les {this.state.playlist.tot} vidéos de la playlist
                </div>
                <div className="list-video row">
                    {pics}
                    </div>
                </div>
        }
        else {
            loading = null
        }

      if((!this.state.list && (this.state.video.desc === "" || this.state.video.id === "" 
      || this.state.video.titre === "" || this.state.already)) ||
      (this.state.list && (this.state.playlist.videos.length === 0 || !this.state.done))){
          sendButton = <button type="button" className="btn btn-primary" disabled >Ajouter vidéo(s)</button>
      }
      else if(this.state.playlist.videos.length > 0 && this.state.done){
        sendButton = <button type="button" className="btn btn-primary" onClick={()=> this.addVideos()} data-dismiss="modal">Ajouter vidéos</button>
      }
      else{
          sendButton = <button type="button" className="btn btn-primary" onClick={()=> this.addVideo()} data-dismiss="modal">Ajouter vidéo</button>
      }


    alert = this.state.already ?
        <div className="alert alert-warning">
            <strong>Attention!</strong> Vidéo déjà dans la base de donnée.
        </div>
        : null  
        pic = this.state.pic !== "" ?
        <img className="thumb-img" src={this.state.pic} alt="thumbnail"/>
        : null  

    oneOrMore =(this.state.list?
    <div id="list">
        <div className="form-group">
            <label htmlFor="url" className="control-label">Url de la playlist</label>
            <input type="text" className="form-control" id="url" name="url" value={this.state.url} onChange={this.handleChangeList} onBlur={()=> this.loadInfoList()} title="Entrer l'url de la playlist" placeholder="https://www.youtube.com/playlist?list=PLNSKpl7JCPswwj_fWkfixq5L7QeZJA4Ot" />
        </div>
        {loading}
    </div>
    :
    <div id="url">
        <div className="form-group">
            <label htmlFor="url" className="control-label">Url de la video</label>
            <input type="text" className="form-control" id="url" name="url" value={this.state.url} onChange={this.handleChangeUrl} onBlur={()=> this.loadInfo()} title="Entrer l'url de la video" placeholder="https://www.youtube.com/watch?v=6Ju9TNFm9kc" />
        </div>
        {pic} {alert}
        <div className="form-group">
            <label htmlFor="titre" className="control-label">Titre</label>
            <input type="text" className="form-control" id="titre" name="titre" value={this.state.video.titre} onChange={this.handleChangeTitre}
                title="Entrer le titre de la video" />
        </div>
        <div className="form-group">
            <label htmlFor="desc" className="control-label">Description</label>
            <textarea className="form-control" id="desc" name="desc" value={this.state.video.desc} onChange={this.handleChangeDesc}></textarea>
        </div>
        </div>)

    
        return (
      

    <div className="modal fade videoModal" id="videoModal" tabIndex="-1" role="dialog" aria-labelledby="addVideoModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content color-normal">
                <div className="modal-header">
                    <h5 className="modal-title" id="addVideoModalLabel">Ajout d'une ou plusieurs vidéo(s)</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="well">
                        <div className="form-group text-align-left">
                            Ajout de playlist
                            <div className="material-switch pull-right col-sm-7">
                                <input id="someSwitchOptionPrimary" name="someSwitchOption001" onChange={this.handleChangeCheck} checked={this.state.list} type="checkbox"/>
                                <label htmlFor="someSwitchOptionPrimary" className="label-primary"></label>
                            </div>
                        </div>
                        {oneOrMore}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    {sendButton}
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default withRouter(AddVideo);
