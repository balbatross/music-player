import React, {
  Component
} from 'react';

export default class GenreTag extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style={{display: 'flex'}} className="genre-selector" onClick={this.props.onClick.bind(this, this.props.genre)}>
        {this.props.genre.label}
        {this.props.editable ? <div onClick={this.props.onRemove.bind(this, this.props.genre)}style={{paddingLeft: '10px'}}>
          x
        </div> : ""}
      </div>
    );
  }
}
