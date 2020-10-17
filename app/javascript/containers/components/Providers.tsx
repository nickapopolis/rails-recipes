import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-components';
import { createBrowserHistory } from 'history';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { createUploadLink } from 'apollo-upload-client';

import { UserContextProvider } from './UserContext';
import { ErrorContextProvider } from './ErrorContext';
import createRootReducer from '../../reducers';
import '../../src/main.css';

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
interface ProvidersProps {
  children: React.ReactElement;
  csrfToken: string;
}
const Providers = ({ children, csrfToken }: ProvidersProps) => {

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

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ErrorContextProvider>
            <UserContextProvider client={client}>
              {children}
            </UserContextProvider>
          </ErrorContextProvider>
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};
export { Providers };
