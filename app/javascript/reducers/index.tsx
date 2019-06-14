import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import recipes from './recipes';

export interface State {
  router: RouterState;
  recipes: typeof recipes;
  form: typeof formReducer;
}

export default history => combineReducers({
  recipes,
  form: formReducer,
  router: connectRouter(history),
});
