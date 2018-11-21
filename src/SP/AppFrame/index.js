import React, {
  Component
} from 'react';
import { Switch, Route } from 'react-router-dom';
import Browse from '../Browse';
import Remix from '../Remix';
import Discover from '../Discover';

import './index.css';
export default class AppFrame extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="sp-player">
        <div className="sp-header">
          <ul>
            <li>Browse</li>
            <li>Discover</li>
            <li>Remix</li>
          </ul>
        </div>
        <div className="sp-content">
          <Switch>
            <Route path="/sp/" component={Browse} exact />
            <Route path="/sp/browse"  component={Browse}/>
            <Route path="/sp/discover" component={Discover} />
            <Route path="/sp/remix" component={Remix} />
          </Switch>
        </div>
      </div>
    );
  }
}
