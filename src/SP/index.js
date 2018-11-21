import React, {
    Component
} from 'react';
import AppFrame from './AppFrame';

import './index.css';

export default class SpotifyPlayer extends Component {
    constructor(props){
        super(props);
        this.state = {
            genres: [],
            artists: [],
            search: '',
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
    _searchArtists(genre){
        this.getArtists(genre).then((artists) => {
            this.setState({artists: artists, selectedGenre: genre});
        })
    }
    _renderGenres(){
        return this.state.genres.filter((x) => {
            return x.label.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1;
        }).map((x) => {
            return (
                <div className="genre-selector" onClick={this._searchArtists.bind(this, x.label)}>{x.label}</div>
            )
        })
    }


    render(){
        return (
          <AppFrame>

          </AppFrame>
        );
    }

}

/*

      {/*<div className="sp-player">
                <div className="side-menu">
                        <input placeholder="Search" type="text" onChange={(e) => this.setState({search: e.target.value})}></input>
                        <div className="genre-list">
                            {this._renderGenres()}

                        </div>

                </div>
                <div className="main-content">
                    <h4>{this.state.selectedGenre}</h4>
                    <ul>
                    {this._renderArtists()}

                    </ul>
                </div>
            </div>*/

