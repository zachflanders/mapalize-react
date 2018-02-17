import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import ol from 'openlayers';
import 'openlayers/dist/ol.css'
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome/svg-with-js/js/fontawesome-all.js'
import axios from 'axios';
import Map from './Map.js';
import Nav from './Nav.js';
import Sidebar from './sidebar/Sidebar.js'

var source = [];
var map;
var draw = [];
var layers = [
  new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://ec2-34-214-28-139.us-west-2.compute.amazonaws.com/geoserver/wms',
      params: {'LAYERS': 'Mapalize:Olathe-Bikeshare', 'TILED': true},
      serverType: 'geoserver',
      transition: 0
    })
  })
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapInfo: {},
      isInput: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.startEditState = this.startEditState.bind(this);
    this.endEditState = this.endEditState.bind(this);

  }
  startEditState(item){
     var mapInfoState = this.state.mapInfo;
     mapInfoState.editing = true;
     if(mapInfoState.features){
       mapInfoState.features.forEach(function(feature, index){
         if(feature.name == item.name){
           mapInfoState.features[index].editing = true;
         }
         else{
           mapInfoState.features[index].editing = false;
         }
       });
       this.setState({ mapInfo: mapInfoState });
     }
   }
   endEditState(item){
      var mapInfoState = this.state.mapInfo;
      mapInfoState.editing=false;
      if(mapInfoState.features){
        mapInfoState.features.forEach(function(feature, index){
          mapInfoState.features[index].editing = false;
        });
        this.setState({ mapInfo: mapInfoState });
      }
    }
  componentDidMount(){
    axios.get('/api/map/5a814d208de6362ccf64675d')
      .then(res => {
        const mapInfo = res.data
        mapInfo.editing = false;
        mapInfo.deleting = false;
        mapInfo.features.forEach(function(feature, index){
          mapInfo.features[index].editing = false;
        })
        mapInfo.editing = false;
        this.setState({ mapInfo });
      });
  }
  handleClick(value){
    this.setState({
      isInput: value
    })
  }
  renderSidebar(isInput){
    return (
      <Sidebar
        isInput={this.state.isInput}
        mapInfo = {this.state.mapInfo}
        startEditState={this.startEditState}
        endEditState = {this.endEditState}
      />
    );
  }
  renderNavbar(isInput){
    return(
      <Nav
        value={this.state.isInput}
        mapInfo = {this.state.mapInfo}
        handleClick={this.handleClick}
      />
    );
  }
  renderMap(isInput){
    return(
      <Map
        isInput={this.state.isInput}
        mapInfo = {this.state.mapInfo}
        endEditState={this.endEditState}
      />
    );
  }
  render() {
    return(
      <div>
        {this.renderNavbar(this.isInput)}
        {this.renderSidebar(this.isInput)}
        {this.renderMap(this.isInput)}
      </div>
    );

  }
}

export default App
