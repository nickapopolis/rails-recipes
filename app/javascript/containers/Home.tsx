import * as React from 'react';
import Appbar from './Appbar';

export default class Home extends React.Component{
  render() {
    return (
      <div>
        <Appbar/>
        <h1>Home</h1>
      </div>
    );
  }
}
