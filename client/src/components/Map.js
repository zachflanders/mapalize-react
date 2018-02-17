import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import ol from 'openlayers';
import 'openlayers/dist/ol.css'
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome/svg-with-js/js/fontawesome-all.js'

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
var featureLayers = [];

var drawingLayersCreated = false;

window.onresize = function(){
  setTimeout( function() {map.updateSize();}, 100);
};

class Map extends React.Component {
  componentDidMount(){
    map = new ol.Map({
        target: 'map',
        layers: layers,
        view: new ol.View({
        })
      });
  }
  render(){
    if(this.props.mapInfo.features && drawingLayersCreated == false){
      map.getView().setZoom(this.props.mapInfo.zoom);
      map.getView().setCenter(ol.proj.fromLonLat(this.props.mapInfo.center));
      var self = this;
      this.props.mapInfo.features.forEach(function(feature, index){
        var featureColor = ol.color.asArray(feature.color);
        featureColor = featureColor.slice();
        if(feature.type == 'line'){
          featureColor[3] = 0.8;
          source[feature.name] = new ol.source.Vector({wrapX: false});
          draw[feature.name] = new ol.interaction.Draw({
            source: source[feature.name],
            type: 'LineString',
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: featureColor,
                width: 8
              }),
              image: new ol.style.Circle({
                radius: 6,
                fill: new ol.style.Fill({
                  color: feature.color
                })
              })
            })
          });
          map.addInteraction(draw[feature.name]);
          if(feature.editing == false){
            draw[feature.name].setActive(false);
          }
          featureLayers.push(
            new ol.layer.Vector({
              source: source[feature.name],
              style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: featureColor,
                  width: 8
                }),
                image: new ol.style.Circle({
                  radius: 6,
                  fill: new ol.style.Fill({
                    color: featureColor
                  })
                })
              })
            })
          )

        }
        else{
          featureColor[3] = 0.8;
          source[feature.name] = new ol.source.Vector({wrapX: false});
          draw[feature.name] = new ol.interaction.Draw({
            source: source[feature.name],
            type: 'Point',
            style: new ol.style.Style({
              image: new ol.style.Icon({
                src: 'mapicon2.png',
                scale: 0.07,
                color: featureColor,
                anchor: [0.5, 1]
              })
            })
          });
          map.addInteraction(draw[feature.name]);
          if(feature.editing == false){
            draw[feature.name].setActive(false);
          }
          featureLayers.push(
            new ol.layer.Vector({
              source: source[feature.name],
              style: new ol.style.Style({
                image: new ol.style.Icon({
                  src: 'mapicon2.png',
                  scale: 0.07,
                  color: featureColor,
                  anchor: [0.5, 1]
                })
              })
            })
          );
        }
        draw[feature.name].on('drawend', function (e) {
          draw[feature.name].setActive(false);
          self.props.endEditState(feature);
        });

      });
      featureLayers.forEach(function(layer){
        map.addLayer(layer);
      })
      drawingLayersCreated = true;
    }
    else if(this.props.mapInfo.features && drawingLayersCreated == true){
      var numDrawEnds = 0;
      if(this.props.isInput == true){
        featureLayers.forEach(function(layer){
          layer.setVisible(true);
        })
        var self = this;
        this.props.mapInfo.features.forEach(function(feature, index){
          if(feature.editing == true){
            draw[feature.name].setActive(true);
          }
          else{
            draw[feature.name].setActive(false);
          }
        });
      }
      else{
        featureLayers.forEach(function(layer){
          layer.setVisible(false);
        })
      }
    };
    return(
      <div id='map'>
      </div>
    );
  }
}
export default Map
