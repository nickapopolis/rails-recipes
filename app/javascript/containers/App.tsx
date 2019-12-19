import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers';
import routes from '../routes';
import '../src/main.css';

import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { createUploadLink } from 'apollo-upload-client';
import { UserContextProvider } from './components/UserContext';
import { ErrorContextProvider } from './components/ErrorContext';

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
const options = {
  uri: '/graphql',
  credentials: 'same-origin',
  headers: {
    'X-CSRF-Token': csrfToken,
  },
};

const httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(options),
  new BatchHttpLink(options),
);

const history = createBrowserHistory();
const store = createStore(
  createRootReducer(history), // root reducer with router state
  applyMiddleware(
    reduxThunk as ThunkMiddleware, routerMiddleware(history), // for dispatching history actions
  ),
);

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: httpLink,
});
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a7ffeb',
      main: '#1de9b6',
      dark: '#00bfa5',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ef6694',
      main: '#ec407a',
      dark: '#a52c55',
      contrastText: '#ffffff',
    },
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ErrorContextProvider>
            <UserContextProvider client={client}>
              <ConnectedRouter history={history}>
                {routes}
              </ConnectedRouter>
            </UserContextProvider>
          </ErrorContextProvider>
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};
export default App;
