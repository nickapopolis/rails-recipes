import * as React from 'react';
import { Route, Switch } from 'react-router';
import SignIn from '../containers/User/SignIn';
import SignUp from '../containers/User/SignUp';
import UserEdit from '../containers/User/UserEdit';
import RecipeDetail from '../containers/Recipe/RecipeDetail';
import RecipeNew, { RecipeEdit } from '../containers/Recipe/RecipeNew';
import RecipeIndex from '../containers/Recipe/RecipeIndex';
import MyRecipesIndex from '../containers/Recipe/MyRecipesIndex';
import AppBar from '../containers/Appbar';

function withAppBar(WrappedComponent, hideSearch = false) {
  return props => (
    <AppBar {...props} hideSearch={hideSearch}>
      <WrappedComponent {...props}/>
    </AppBar>
  );
}
const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={withAppBar(RecipeIndex, true)} />
      <Route exact path="/recipes/new" component={withAppBar(RecipeNew)} />
      <Route exact path="/recipes/:id" component={withAppBar(RecipeDetail)} />
      <Route exact path="/recipes/:id/edit" component={withAppBar(RecipeEdit)} />
      <Route exact path="/my_recipes" component={withAppBar(MyRecipesIndex)} />
      <Route exact path="/users/sign_in" component={withAppBar(SignIn)} />
      <Route exact path="/users/sign_up" component={withAppBar(SignUp)} />
      <Route exact path="/users/:id/edit" component={withAppBar(UserEdit)} />
    </Switch>
  </div>
);

export default routes;
