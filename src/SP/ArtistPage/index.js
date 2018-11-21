import React, {
  Component
} from 'react';

import './index.css';

export default class ArtistPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...props,
      tracks: [],
      albums: []
    }
  }

  componentDidMount(){
    this.getData();
  }

  componentWillReceiveProps(newProps){
  
    if(this.state.artist.id !== newProps.artist.id){
      this.getData();
    }
    if(this.props !== newProps){
      this.setState({
        ...newProps
      });
    }

  }

  getData(){
    this.getAlbums(this.state.artist.id).then((albums) => {
      this.setState({albums: albums});
    });
  } 

    getAlbums(artist){
      return fetch('http://45.32.243.178:3000/sp/artists/'+ artist + '/albums').then((r) => {
        return r.json();
      });
    }
    getTracks(album){
      return fetch('http://45.32.243.178:3000/sp/albums/' + album + '/tracks').then((r) => {
        return r.json();
      });
    }

  _renderTracks(){
    return this.state.tracks.map((x) => {
      return (
        <li onClick={() => this.setState({selectedTrack: x})}>
          {x.name}
        </li>
      );
    });
  }

  _renderAlbums(){
    return this.state.albums.map((x) => {
      return (
      <li onClick={() => {
        this.getTracks(x.id).then((tracks) => {
          this.setState({tracks: tracks})
        });
      this.setState({selectedAlbum: x})}}>
        <img src={x.images[0].url} style={{height: '100px', width: '100px'}}/>
      {x.name}
      
      </li>)
    });
  }

  _renderRelated(){
    return this.state.artist.related.map((x) => {
      return (
        <div>
          <img src={x.images[0].url} style={{height: '50px', width: '50px'}}/>
        {x.name}</div>
      );
    });
  }

  _renderMainContent(){
    if(this.state.selectedAlbum){

      return (
        <div className="track-list">
          <h4>{this.state.selectedAlbum.name}</h4>
          <img src={this.state.selectedAlbum.images[0].url} style={{height:"80px", width: "80px"}}/>
          <ul>
            {this._renderTracks()}
          </ul>
        </div>
      );
    }else{
      return (

          <div className="album-list">
            <ul>
            {this._renderAlbums()}
            </ul>
          </div>
      );
    }
  }

  _renderAudio(){
    if(this.state.selectedTrack){
      return (<audio controls src={this.state.selectedTrack.preview} />);
    }else{
      return null;
    }
  }

  render(){
    return (
      
      <div className="artist-page">
          <div className="nav">
            <div onClick={() => {
              if(this.state.selectedAlbum){
                this.setState({selectedAlbum: null});
              }else{
                this.props.onBack();
              }
            }}>{" << Back"}</div>
          </div>
          <div className="artist-page-content">
          {this._renderMainContent()} 
          <div className="related-artists">
            {this._renderRelated()}
          </div>
          </div>
          <div className="fixed-music-player">
            {this._renderAudio()}
          </div>
        </div>
    );
  }
}
