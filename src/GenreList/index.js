import React, {
    Component
} from 'react';

import './index.css';

export default class GenreList extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...props,
            search: ''
        }
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
        if(this.props !== newProps){
            this.setState({
                ...newProps
            })
        }
    }

    onSelect(genre){
        if(this.props.onSelect){
            this.props.onSelect(genre);
        }
    }
    _renderGenres(){
        return this.props.genres.filter((genre) => {
            return (genre) ? genre.indexOf(this.state.search) > -1 : false
        }).map((x) => {
            return (
                <li onClick={this.onSelect.bind(this, x)}>
                    {x}
                </li>
            );
        });
    }

    search(e){
        this.setState({
            search: e.target.value
        })
    }

    render(){
        return (
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <input type="text" placeholder="Search..." onChange={this.search.bind(this)}/>
                <ul className="genre-list">
                    {this._renderGenres()}
                </ul>
            </div>
        );
    }
}
