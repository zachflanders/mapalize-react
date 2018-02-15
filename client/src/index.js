import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import ol from 'openlayers';
import 'openlayers/dist/ol.css'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome/svg-with-js/js/fontawesome-all.js'
import axios from 'axios'
import AppContainer from './components/AppContainer.js'
import {
  Switch, BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


// ========================================

ReactDOM.render((
  <Router>
    <AppContainer />
  </Router>
),
  document.getElementById('root')
);
