import React, {
  Component
} from 'react';

export default class Song extends Component {
  constructor(props){
    super(props);
  }   

  render(){
    return (
      <div>
        <span>{this.props.title}</span>
        <audio controls src={"http://45.32.243.178:3000/stream/" + this.props.id} />
      </div>
    );  
  }
}
