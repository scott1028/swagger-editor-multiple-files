'use strict';

import jsonServer from 'json-server';

const jsonServerRouter = jsonServer.router('src/fixtures/json-server-db.json');  // fake data from json-server
const jsonServerMiddlewares = jsonServer.defaults();  // include cors, json-parse, log, etc

export default app => {
  // allow cors for swagger
  app.use(jsonServerMiddlewares);  // app.use(cors());

  // optional Way#2: api scheme provided by json-server
  app.use('/api-v2', jsonServerRouter);

  // override some api for making it correspond to your client,
  // if you override path is not existing in json-server-database, it will return 404 status code.
  //
  // You can take a look at json-server/src/router.js:39 ~ 41
  jsonServerRouter.render = (req, res) => {
    if(req.url.match(/^\/posts\/{0,1}$/) && req.method.match(/^GET$/)) {
      res.status(200).jsonp({
        posts: res.locals.data,
        message: 'This is custom response format!!',
      });
    }
    else {
      res.jsonp(res.locals.data);  // default render of json-server
    }
  };

  return app;
}
