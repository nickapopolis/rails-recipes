import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import recipes from './recipes';

export interface State {
  router: RouterState;
  recipes: typeof recipes;
}

export default history => combineReducers({
  recipes,
  router: connectRouter(history),
});
