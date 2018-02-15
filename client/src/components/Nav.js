import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import ol from 'openlayers';
import 'openlayers/dist/ol.css'
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome/svg-with-js/js/fontawesome-all.js'

class Nav extends React.Component {
  render() {
    var buttonGroup;
    if(this.props.value){
      buttonGroup = <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-outline-light active" onClick={() => this.props.handleClick(true)}><i className="fas fa-pencil-alt"></i> Input</button>
                      <button type="button" className="btn btn-outline-light" onClick={() => this.props.handleClick(false)}><i className="fas fa-fire"></i> Results</button>
                    </div>
    }
    else{
      buttonGroup = <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-outline-light" onClick={() => this.props.handleClick(true)}><i className="fas fa-pencil-alt"></i> Input</button>
                      <button type="button" className="btn btn-outline-light active" onClick={() => this.props.handleClick(false)}><i className="fas fa-fire"></i> Results</button>
                    </div>
    }

      return(
        <nav className="navbar fixed-top navbar-dark" id='main-nav'>
          <a className="navbar-brand" href="#"><i className="fas fa-bicycle"></i> {this.props.mapInfo.name}</a>
            {buttonGroup}
        </nav>
      )
    }
  }

  export default Nav
