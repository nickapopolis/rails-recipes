import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers';
import routes from '../routes';
import '../src/main.css';

const history = createBrowserHistory();
const store = createStore(
  createRootReducer(history), // root reducer with router state
  applyMiddleware(
    reduxThunk as ThunkMiddleware, routerMiddleware(history), // for dispatching history actions
  ),
);

const cache = new InMemoryCache();

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
const client = new ApolloClient({
  cache,
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': csrfToken,
  },
});
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8effc6',
      main: '#59d495',
      dark: '#16a267',
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
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            {routes}
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};
export default App;
