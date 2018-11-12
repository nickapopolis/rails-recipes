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
import '../styles/app';

const history = createBrowserHistory();
const store = createStore(
	connectRouter(history)(reducers),
	applyMiddleware(reduxThunk as ThunkMiddleware, routerMiddleware(history)),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#bef67a',
      main: '#8bc34a',
      dark: '#5a9216',
      contrastText: '#000000',
    },
    secondary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff',
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
