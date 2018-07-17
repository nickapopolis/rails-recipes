import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../containers/Home';
import SignIn from '../containers/SignIn';

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
	    <Route exact path="/users/sign_in" component={SignIn} />
    </Switch>
  </div>
);

export default routes;
