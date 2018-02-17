import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import ol from 'openlayers';
import 'openlayers/dist/ol.css'
import '../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'fontawesome/svg-with-js/js/fontawesome-all.js'

class FeatureButtons extends React.Component {
  render() {
    return(
          <div className="btn-group-vertical">
            {
              this.props.mapInfo.features.map(function(item) {
                var icon;
                if(item.type == 'line'){
                  icon = <svg height="20" width="23" >
                            <line x1="3" y1="15" x2="20" y2="15"
                              style={{
                                stroke: item.color,
                                strokeWidth: 4
                              }}
                              />
                          </svg>
                }
                else{
                  icon = <i
                            className="fas fa-map-marker-alt"
                            style = {{
                              color: item.color,
                              marginRight:'5px',
                              marginLeft: '5px'
                            }}
                          ></i>
                }
                return (
                  <button
                    className={'btn btn-outline-secondary '+ (item.editing ? "active" : "")}
                    onClick={() =>{this.props.startEditState(item)}}
                    style = {{
                      whiteSpace: 'normal',
                      textAlign:'left',
                      paddingLeft: '35px',
                      textIndent:'-26px'
                    }}
                  >
                    {icon}&nbsp;
                    {item.name}
                  </button>
                )
              }, this)
            }
          </div>
    )
  }
}

class ShowFeatures extends React.Component {
  render() {
    return(
      <div className='container-fluid'>
          {
            this.props.mapInfo.features.map(function(item) {
              var icon;
              if(item.type == 'line'){
                icon = <svg height="20" width="23" >
                          <line x1="3" y1="15" x2="20" y2="15"
                            style={{
                              stroke: item.color,
                              strokeWidth: 4
                            }}
                            />
                        </svg>
              }
              else{
                icon = <i
                          className="fas fa-map-marker-alt"
                          style = {{
                            color: item.color,
                            marginRight:'5px',
                            marginLeft: '5px'
                          }}
                        ></i>
              }
              return (
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" />
                  <label className="form-check-label">
                    {icon} {item.name}
                  </label>
                </div>
              )
            })
          }

      </div>
    )
  }
}

class Sidebar extends React.Component {
  render() {
    return(
      <div className='sidebar show'>
        <div className='container-fluid'>
          <br />
          <h5 className='text-center'>
            {((this.props.isInput) ? 'Input' : 'Results')}
          </h5>
          <hr />
          <h6 className='text-center'>
            {((this.props.isInput) ? 'Create Features' : 'Show Features')}
          </h6>
          {((this.props.mapInfo.editing) ?
            <button
              className='btn btn-info btn-block'
              style={{marginBottom:'15px'}}
              onClick={this.props.endEditState}
            >
              Cancel
            </button> : "")}
          {((this.props.isInput && this.props.mapInfo.features) ?
            <FeatureButtons
              mapInfo = {this.props.mapInfo}
              startEditState = {this.props.startEditState}
              endEditState = {this.props.endEditState}
            /> : '')}
            {((!this.props.isInput && this.props.mapInfo.features) ?
              <ShowFeatures
                mapInfo = {this.props.mapInfo}
              /> : '')}
            <hr />
            {((this.props.isInput && this.props.mapInfo.features) ?
              <button className='btn btn-block btn-primary'>
                <i class="fas fa-cloud-upload-alt"></i> Upload
              </button>
            : '')}
        </div>
      </div>

    );

    /*
    if(this.props.isInput && this.props.mapInfo.features){
      return(
        <InputSidebar
          mapInfo = {this.props.mapInfo}
          startEditState={this.props.startEditState}
        />
      );
    }
    else if(!(this.props.isInput) && this.props.mapInfo.features) {
      return(
        <div className='sidebar show'>
        <div className='container-fluid text-center'>
          <br />
          <h5>
            Results
          </h5>
          <hr />
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-outline-secondary"><i className="far fa-map"></i> View Map</button>
            <button type="button" className="btn btn-outline-secondary"><i className="fas fa-list"></i> View List</button>
          </div>
          <hr />
          <h6>Show Features</h6>
        </div>
        <div className='container-fluid'>
            {
              this.props.mapInfo.features.map(function(item) {
                var icon;
                if(item.type == 'line'){
                  icon = <svg height="20" width="23" >
                            <line x1="3" y1="15" x2="20" y2="15"
                              style={{
                                stroke: item.color,
                                strokeWidth: 4
                              }}
                              />
                          </svg>
                }
                else{
                  icon = <i
                            className="fas fa-map-marker-alt"
                            style = {{
                              color: item.color,
                              marginRight:'5px',
                              marginLeft: '5px'
                            }}
                          ></i>
                }
                return (
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" />
                    <label className="form-check-label">
                      {icon} {item.name}
                    </label>
                  </div>
                )
              })
            }

        </div>
        </div>
      );
    }
    else{
      return(
        <div className='sidebar show'>
          <div className='container-fluid text-center'>
          </div>
        </div>
      );

    }
      */
  }
}
export default Sidebar
