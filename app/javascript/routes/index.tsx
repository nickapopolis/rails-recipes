import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../containers/Home';
import SignIn from '../containers/User/SignIn';
import SignUp from '../containers/User/SignUp';
import RecipeDetail from '../containers/Recipe/RecipeDetail';
import RecipeNew, { RecipeEdit } from '../containers/Recipe/RecipeNew';
import RecipeIndex from '../containers/Recipe/RecipeIndex';
import MyRecipesIndex from '../containers/Recipe/MyRecipesIndex';
import AppBar from '../containers/Appbar';
import RecipeSearch from '../containers/Recipe/RecipeSearch/RecipeSearch';

function withAppBar(WrappedComponent) {
  return props => (
    <AppBar {...props}>
      <WrappedComponent {...props}/>
    </AppBar>
  );
}
const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={withAppBar(Home)} />
      <Route exact path="/recipes/new" component={withAppBar(RecipeNew)} />
      <Route exact path="/recipes/:id" component={withAppBar(RecipeDetail)} />
      <Route exact path="/recipes/:id/edit" component={withAppBar(RecipeEdit)} />
      <Route exact path="/recipes" component={withAppBar(RecipeIndex)} />
      <Route exact path="/my_recipes" component={withAppBar(MyRecipesIndex)} />
      <Route exact path="/users/sign_in" component={withAppBar(SignIn)} />
      <Route exact path="/users/sign_up" component={withAppBar(SignUp)} />
      <Route exact path="/search" component={withAppBar(RecipeSearch)} />
      <Route exact path="/search/:query" component={withAppBar(RecipeSearch)} />
    </Switch>
  </div>
);

export default routes;
