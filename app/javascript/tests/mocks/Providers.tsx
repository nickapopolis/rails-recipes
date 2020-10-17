import * as React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import { UserContext, User } from '../../containers/components/UserContext';
import { ErrorContextProvider } from '../../containers/components/ErrorContext';
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
// https://github.com/apollographql/apollo-client/issues/5208
const MockedProviderAny = MockedProvider as any;

interface ProvidersProps {
  children?: React.ReactElement;
  graphql: ReadonlyArray<MockedResponse>;
  user: User;
}
const Providers = ({ children, graphql, user }: ProvidersProps) => {

  const history = createBrowserHistory();
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    applyMiddleware(
      reduxThunk as ThunkMiddleware, routerMiddleware(history), // for dispatching history actions
    ),
  );

  return (
    <MockedProviderAny mocks={graphql} addTypename={false} defaultOptions={{ getDataFromTree: 'ssr' }}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ErrorContextProvider>
            <UserContext.Provider value={{
              user,
              reload() {},
            }}>
              {children}
            </UserContext.Provider>
          </ErrorContextProvider>
        </MuiThemeProvider>
      </Provider>
    </MockedProviderAny>
  );
};
export { Providers };
