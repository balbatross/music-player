import React, { Component } from 'react';
import logo from './logo.svg';
import Song from './Song';
import GenreList from './GenreList';
import SongList from './SongList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      genres: [],
      songs: []
    }
  }

  componentDidMount(){
    this.getGenres().then((genres) => {
      this.setState({genres: genres});
    });
  }

  getGenres(){
    return fetch('http://45.32.243.178:3000/genre').then((r) => {
      return r.json();
    });
  }

  getTracks(genre){
    return fetch('http://45.32.243.178:3000/tracks/' + genre).then((r) => {
      return r.json();
    });
  }

  selectGenre(g){
    this.getTracks(g).then((tracks) => {
      this.setState({songs: tracks});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="genres">
            <GenreList onSelect={(genre) => this.selectGenre(genre)} genres={this.state.genres} />
        </div>
        <div className="songs">
            <div className="player">
                <Song song={this.state.selectedSong} />
            </div>
            <div className="playlist">
                <SongList tracks={this.state.songs} onSelect={(song) => this.setState({selectedSong: song})}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
