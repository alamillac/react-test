import Logger from 'plugins/logger';
import React from 'react';

const logger = Logger.createLogger('App');

logger.debug('Init app component');

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello World</h1>
      </div>);
  }
}
