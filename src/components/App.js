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
      nbPerPage: 18,
      page : 1,
      totVideo : 0,
      loading : false,
      intervalId: 0
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
        limitToLast:this.state.nbPerPage
      },
      then(data){
        this.setState({
          loading:false
        })
      }
    });
    fire.database().ref("videos").once("value").then((snapshot)=> {
    this.setState({totVideo : snapshot.numChildren()})})
    window.addEventListener("scroll", this.handleScroll);
  }

  toTheTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

scrollStep() {
  if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
  }
  window.scroll(0, window.pageYOffset - 100);
}

scrollToTop() {
  let intervalId = setInterval(this.scrollStep.bind(this), 10);
  this.setState({ intervalId: intervalId });
}

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
   
    if (windowBottom >= docHeight && this.state.totVideo > (this.state.nbPerPage * this.state.page)) {
      this.changePage();
    }
    if(html.scrollTop > windowHeight){
      document.getElementById("backToTop").style.display = "block";
    }
    else{
      document.getElementById("backToTop").style.display = "none";
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentWillReceiveProps(newProps){
    fire.database().ref("videos").once("value").then((snapshot)=> 
    this.setState({totVideo : snapshot.numChildren()}))
  }

  changePage(){
    this.setState({
      loading:true
    })
    this.ref = base.bindToState("videos", {
      context: this,
      state: 'videos',
      queries:{
        limitToLast: this.state.nbPerPage * (this.state.page+1)
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
    } 
  )    
    this.setState({
      page : this.state.page+1
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
        <button onClick={()=>this.scrollToTop()} className="btn btn-secondary" id="backToTop" title="backToTop"><i className="fa fa-arrow-up fa-lg"></i></button> 
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
