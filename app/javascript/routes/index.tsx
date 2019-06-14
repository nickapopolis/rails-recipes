import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../containers/Home';
import SignIn from '../containers/SignIn';
import RecipeDetail from '../containers/Recipe/RecipeDetail';
import RecipeNew from '../containers/Recipe/RecipeNew';
import RecipeIndex from '../containers/Recipe/RecipeIndex';
import MyRecipesIndex from '../containers/Recipe/MyRecipesIndex';
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
      <Route exact path="/recipes/new" component={withAppBar(RecipeNew)} />
      <Route exact path="/recipes/:id" component={withAppBar(RecipeDetail)} />
      <Route exact path="/recipes" component={withAppBar(RecipeIndex)} />
      <Route exact path="/my_recipes" component={withAppBar(MyRecipesIndex)} />
      <Route exact path="/users/sign_in" component={SignIn} />
    </Switch>
  </div>
);

export default routes;
