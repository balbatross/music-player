import React, {
    Component
} from 'react';

import './index.css';
export default class SongList extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props
        }
    }

    _renderSongs(){
        return this.props.tracks.map((x) => {
            return (
                <li onClick={this.onSelect.bind(this, x)}>
                    {x.title} - {parseInt(x.duration) / 1000 / 60}mins
                </li>
            );
        });
    }

    onSelect(song){
        if(this.props.onSelect){
            this.props.onSelect(song);
        }
    }

    render(){
        return (
            <div className="song-list">
                <ul>
                    {this._renderSongs()}
                </ul>
            </div>
        );
    }
}
