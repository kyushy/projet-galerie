import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import logo from '../logo.svg';
import cat from '../cat.svg';
import Thumbnails from './Thumbnails';
import Stars from './Stars';
import base from '../fire.js';
import fire from '../base.js';
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
            oldVideo : {},
            edit: false,
            nbVideo : 8,
            nbPerPage: 8,
            totVideo : 0,
            loading : false
          };
          this.handleChangeDesc = this.handleChangeDesc.bind(this);
          this.handleChangeTitre = this.handleChangeTitre.bind(this);
          this.divScroll = this.divScroll.bind(this)
    }

    divScroll(event){
        let dom = ReactDOM.findDOMNode(this).getElementsByClassName("side-video")[0]

        let scrollviewOffsetY = dom.scrollTop
        let scrollviewFrameHeight = dom.clientHeight
        let scrollviewContentHeight = dom.scrollHeight
        let sum = scrollviewOffsetY+scrollviewFrameHeight

        if (sum >= scrollviewContentHeight && this.state.totVideo > this.state.nbVideo) {
            console.log("test")
            this.changePage()
            }
    }

    changePage(){
        this.setState({
          loading:true
        })
        base.bindToState("videos", {
          context: this,
          state: 'videos',
          queries:{
            limitToLast:this.state.nbVideo + this.state.nbPerPage
          },
          then(data){
            this.setState({
              loading:false
            })
          }
        });
        let tot = 0;
        fire.database().ref("videos").once("value").then((snapshot)=> 
        tot = snapshot.numChildren())    
        this.setState({
          nbVideo : this.state.nbVideo + this.state.nbPerPage,
          totVideo : tot
        })
      }
    
  componentDidMount() {
    base.bindToState("videos", {
      context: this,
      state: 'videos',
      queries:{
        limitToLast:this.state.nbVideo
      }
    });
    this.ref = base.syncState(`videos/${this.props.match.params.video}`, {
        context: this,
        state: 'video',
        then(){
            this.setState({
            oldVideo : {desc : this.state.video.desc, titre:this.state.video.titre}
            })
        }
      });
      fire.database().ref("videos").once("value").then((snapshot)=> 
    this.setState({totVideo : snapshot.numChildren()}))
  }

  componentWillReceiveProps(newProps){
      base.removeBinding(this.ref)
    this.ref = base.syncState(`videos/${newProps.match.params.video}`, {
        context: this,
        state: 'video'
      });
  }

    modifButtonClicked(){
        this.setState({
            edit : true,
            oldVideo : {desc : this.state.video.desc, titre:this.state.video.titre}
        })
    }

    validButtonClicked(){
        const {match} = this.props;
        let video = this.state.video;
        video.desc = this.state.oldVideo.desc
        video.titre= this.state.oldVideo.titre
        this.setState({
          video : video,
          edit : false
        })
    }

    cancelButtonClicked(){
        this.setState({
          edit : false
        })
    }

    deleteClicked(){

        const {match} = this.props;
        let video = this.state.video;
        video = null
        this.setState({
          video : video
        })
        this.props.history.push(`/`);
    }

    starClicked(val){
        const {match} = this.props;
        let video = this.state.video;
        video.note.val = ((video.note.val * video.note.nb) 
        + val )/ (video.note.nb+1);
        video.note.nb ++
        this.setState({
          video: video
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
        let video = this.state.oldVideo
        video.desc = event.target.value
        this.setState({oldVideo : video});
    }
    handleChangeTitre(event) {
        let video = this.state.oldVideo
        video.titre = event.target.value
        this.setState({oldVideo : video});
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
       <input type="text" className="form-control col-sm-12" id="titre" name="titre" value={this.state.oldVideo.titre} onChange={this.handleChangeTitre} title="Entrer le titre de la video"
                                /></div>
        :<h4 className="col-sm-12">{this.state.video.titre}</h4>)

        let desc = (this.state.edit ?
        <textarea className="form-control" id="desc" name="desc" value={this.state.oldVideo.desc} onChange={this.handleChangeDesc}
                                ></textarea>
                                :this.state.video.desc)
        let blueButton = (this.state.edit? <button type="button" className="btn btn-primary width-100" onClick={()=>this.validButtonClicked()}>Valider</button> 
        : <button type="button" className="btn btn-primary width-100" onClick={()=>this.modifButtonClicked()}>Modifier</button>)

        let redButton = (this.state.edit? <button type="button" className="btn btn-danger width-100 margin-top-15" onClick={()=>this.cancelButtonClicked()}>Annuler</button> 
        : <button type="button" className="btn btn-danger width-100 margin-top-15" data-toggle="modal" data-target=".bd-modal-sm">Supprimer</button>)

        let loading = (this.state.loading?<img src={cat} style={{width:"100%"}} alt="logo" />:"")
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
                {redButton}
            </div>
            <div id="nav" onScroll={this.divScroll} className="col-sm-2 side-video">
                <div>
                <Thumbnails videos={this.state.videos} id={this.state.video} side={true} />
                {loading}
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