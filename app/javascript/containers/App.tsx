import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import routes from '../routes';
import '../src/main.css';

import { Providers } from './components/Providers';

const history = createBrowserHistory();

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');

const App = () => {
  return (
    <Providers csrfToken={csrfToken}>
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
    </Providers>
  );
};
export default App;
