import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import {
  Home,
} from './containers'

const Routes = ({ history }) => (
  <Router history={history}>
    <Route exact path="/" component={Home}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
);

export default Routes;