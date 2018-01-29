import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import cat from '../cat.svg';
import Thumbnails from './Thumbnails';
import fire from '../base.js';
import base from '../fire.js';
import '../css/App.css';
import Sidebar from './Sidebar';
import AddVideo from './AddVideo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos : {},
      nbVideo : 18,
      nbPerPage: 18,
      totVideo : 0,
      loading : false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  
  componentWillMount() {
    this.setState({
      loading:true
    })
    this.ref = base.bindToState("videos", {
      context: this,
      state: 'videos',
      queries:{
        limitToLast:this.state.nbVideo
      },
      then(data){
        this.setState({
          loading:false
        })
      }
    });
    fire.database().ref("videos").once("value").then((snapshot)=> 
    this.setState({totVideo : snapshot.numChildren()}))
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && this.state.totVideo > this.state.nbVideo) {
      this.changePage();
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    window.removeEventListener("scroll", this.handleScroll);
  }

  changePage(){
    this.setState({
      loading:true
    })
    this.ref = base.bindToState("videos", {
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
    fire.database().ref("videos").once("value").then((snapshot)=>{ 
      tot = snapshot.numChildren();
      this.setState({
        totVideo : tot
      })
      console.log(tot)
    } 
  )    
    this.setState({
      nbVideo : this.state.nbVideo + this.state.nbPerPage,
    })
  }


  render() {

    let loading = (this.state.loading?<img src={cat} style={{width:"300px"}} alt="logo" />:"")
    return (
      <div className="App back-color">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Galerie MBDS</h1>
        </header>
        <div className="row">
        <Sidebar/>
        <div className="container decale-toi">
          
          <Thumbnails videos={this.state.videos} side={false}/>
          {loading}
        </div>
        </div>
        
        <AddVideo/>
         </div>
    );
  }
}

export default App;
