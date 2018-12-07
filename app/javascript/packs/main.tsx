import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../containers/App';
import '../lib/fontawesome';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.body.appendChild(document.createElement('div')),
  );
});
