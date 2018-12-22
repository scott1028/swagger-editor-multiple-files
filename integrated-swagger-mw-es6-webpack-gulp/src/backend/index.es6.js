'use strict';

import http from 'http';
import opn from 'opn';
import app from './app.es6';

const port = 3000;
const server = http.createServer(app)

let currentApp = app;

// bind to port of localhost
server.listen(port, function() {
  console.log(`Mock-Api-Server listening on port ${port}!`);
});

// for support HMR of webpack, according to `https://webpack.js.org/guides/hot-module-replacement/`
if (module.hot) {
  module.hot.accept('./app.es6', function() {
    console.log('Accepting the updated module!');

    // Ref: https://hackernoon.com/hot-reload-all-the-things-ec0fed8ab0
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });

  // only when developing this should be executed.
  if(!process.env.SKIP_OPN) {
    opn(`http://localhost:${port}/api-docs`);
  }
};
