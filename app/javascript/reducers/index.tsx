import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import recipes from './recipes';

const rootReducer = combineReducers({
  recipes,
  form: formReducer,
});
export interface State {
  router: RouterState;
  recipes: typeof recipes;
  form: typeof formReducer;
}
export default rootReducer;
