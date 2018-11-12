import React, {
  Component
} from 'react';

import './index.css';
export default class Song extends Component {
  constructor(props){
    super(props);
  }   

  render(){
    if(this.props.song){
    return (
      <div className="song-player">
        <div>{this.props.song.title}</div>
        {this.props.song.artwork_url ? <img src={this.props.song.artwork_url} /> : null}
        <audio controls src={"http://45.32.243.178:3000/stream/" + this.props.song.id} />
      </div>
    );  
    }else{
        return null;
    }
  }
}
