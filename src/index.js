import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom'
import './css/index.css';
import App from './components/App';
import Video from './components/Video';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
      <Router>
        <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/videos/:video" component={Video}/>
                <Route component={NoMatch}/>
        </Switch>
      </Router>
)

const NoMatch = ({ location }) => (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)
  
ReactDOM.render(<Root/>, document.querySelector('#root'));
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
