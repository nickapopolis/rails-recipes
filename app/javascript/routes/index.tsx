import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../containers/Home';
import SignIn from '../containers/SignIn';
import RecipeDetail from '../containers/RecipeDetail';
import AppBar from '../containers/Appbar';

function withAppBar(WrappedComponent) {
  return props => (
    <AppBar {...props}>
      <WrappedComponent/>
    </AppBar>
  );
}
const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={withAppBar(Home)} />
	    <Route exact path="/recipes/:id" component={withAppBar(RecipeDetail)} />
	    <Route exact path="/users/sign_in" component={SignIn} />
    </Switch>
  </div>
);

export default routes;
