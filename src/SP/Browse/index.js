import React, {
  Component
} from 'react';
import GenreTag from '../GenreTag';
import './index.css';
export default class Browse extends Component {
  constructor(props){
    super(props);
  this.state = {
      genres: [], 
      search: '',
      selected: [],
      artists: [],
      tracks: []
    }
}


    componentDidMount(){
        this.getGenres().then((genres) => {
            this.setState({genres: genres});
        })
    }

    getGenres(){
        return fetch('http://45.32.243.178:3000/sp/genres').then((r) =>{
            return r.json();
        })
    }

    getArtists(genre){
        return fetch('http://45.32.243.178:3000/sp/artists/'+genre).then((r) =>{
            return r.json();
        })
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

    onSelectionChange(selected){
      selected = selected.map((x) => x.label).join(',')
      this.getArtists(selected).then((artists) => {
      console.log(artists);
        this.setState({artists: artists});
      });
    }

    _searchArtists(genre){
      let selected = this.state.selected;
      selected.push(genre)
      this.setState({selected: selected});
      this.onSelectionChange(selected);
      /*
        this.getArtists(genre).then((artists) => {
            this.setState({artists: artists, selectedGenre: genre});
        })*/
    }

    removeGenre(g){
      let selected = this.state.selected;
      for(var i = 0; i < selected.length; i++){
        if(selected[i].label == g.label){
          selected.splice(i, 1);
        }
      }
      this.setState({selected:selected})
      this.onSelectionChange(selected)
    }

    _renderGenres(){
        return this.state.genres.filter((x) => {
            return x.label.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1;
        }).map((x) => {
            return (
                <li><GenreTag onClick={this._searchArtists.bind(this, x)} genre={x}/></li>
            )
        })
    }

    _renderSelectedGenres(){
      return this.state.selected.map((x) => {
        return (
          <GenreTag genre={x} editable onClick={() => {}} onRemove={(g) => {
            this.removeGenre(g);
          }}/>
        );
      });
    }

    _selectArtist(artist){
      var id = artist.href.split('https://api.spotify.com/v1/artists/')[1];
      artist.id = id;
      this.getAlbums(id).then((albums) => {
        this.setState({albums: albums, selectedArtist: artist});
        console.log(albums);
      });
    }

    _renderArtists(){
        return this.state.artists.map((x) => {
            return (
                <li onClick={this._selectArtist.bind(this, x)}>
                
                {x.images.length > 0 ? <img src={x.images[0].url} /> : ""}
                
                <div className="artist-name">{x.name}</div>
                
                </li>
            )
        })
    }

  _selectAlbum(album){
    this.getTracks(album.id).then((tracks) => {
      this.setState({tracks: tracks});
    });
  }
    _renderArtistPage(){
      let albums = this.state.albums.map((x) => {
        return (
        <li style={{display: 'flex', flexDirection: 'column'}} onClick={this._selectAlbum.bind(this, x)}>
          <img src={x.images[0].url} style={{height: '100px', width: '100px'}}/>
<div>{x.name}</div>
        </li>
        );
      });

      let tracks = this.state.tracks.map((x) => {
        return (
          <div>{x.name}</div>
        );
      }); 

      return (
        <div className="artist-page">
          <div className="nav">
            <div onClick={() => this.setState({selectedArtist: null})}>Back</div>
          </div>
          <div className="album-list">
            <ul>
            {albums}
            </ul>
          </div>
          <div className="track-list">
            {tracks}
          </div>
        </div>
      );
    }

    _renderContent(){
      if(!this.state.selectedArtist){
        return (
          <ul>
          {this._renderArtists()}     
          </ul>
        );
      }else{
        return this._renderArtistPage()
      }
    }
  render(){
    return (
      <div className="browser">
        <div className="side-menu">
          <div className="search">
            <input type="text" placeholder="Search genres" onChange={(e) => this.setState({search: e.target.value})}/>
            {this.state.selected.length > 0 ? <ul style={{display: 'flex', padding: 5, flexWrap: 'wrap'}}>
            {this._renderSelectedGenres()}
            </ul> : ""}
          </div>
          <div style={{overflowY: 'scroll', flex: 1}}>
            <ul style={{padding: 5}}>
              {this._renderGenres()}
            </ul>
          </div>
        </div>
        <div className="content">
          {this._renderContent()}
        </div>
      </div>
    );
  }
}
