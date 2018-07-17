import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import recipes from './recipes';

const rootReducer = combineReducers({
  recipes,
});
export interface State {
  recipes: Map<string, Object>;
  router: RouterState;
}

export default rootReducer;
