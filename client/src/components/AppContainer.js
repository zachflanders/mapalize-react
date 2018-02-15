import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import ol from 'openlayers';
import 'openlayers/dist/ol.css'
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome/svg-with-js/js/fontawesome-all.js'
import App from './App.js'
import Main from './Main.js'
import axios from 'axios'
import {
  Switch, BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class AppContainer extends React.Component {
  render() {
      return(
        <Switch>
          <Route exact path='/app' render={()=><App id='5a814d208de6362ccf64675d' />}/>
          <Route exact path='/' component={Main}/>
      </Switch>
      );
    }
  }

  export default AppContainer
