import React, { Component } from 'react';
import logo from './logo.svg';
import Song from './Song';
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
          {this.state.genres.map((x) => {
            return (
              <div onClick={this.selectGenre.bind(this, x)}>{x}</div>
            );
          })}
        </div>
        <div className="songs">
          {this.state.songs.map((x) => {
            return (
              <Song id={x.id} title={x.title}/>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
