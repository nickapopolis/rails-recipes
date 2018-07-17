import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import primaryColor from '../lib/primary-color';
import { createBrowserHistory } from 'history';
import reducers from '../reducers';
import routes from '../routes';

const history = createBrowserHistory();
const store = createStore(
	connectRouter(history)(reducers),
	applyMiddleware(reduxThunk as ThunkMiddleware, routerMiddleware(history)),
);

const theme = createMuiTheme({
  palette: {
    primary: primaryColor,
    secondary: blue,
    background: {
      default: '#eceef0',
    },
  },
});
const App = () => {
  return (
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<ConnectedRouter history={history}>
					{ routes }
				</ConnectedRouter>
			</MuiThemeProvider>
		</Provider>
  );
};
export default App;
