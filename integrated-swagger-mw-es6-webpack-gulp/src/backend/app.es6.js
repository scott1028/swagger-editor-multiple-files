'use strict';

// for swagger-extension of express
// import * as fs from 'fs';  // this is no use when using js-yaml-loader
// import yaml from 'js-yaml';  // this could be substituted by `json-loader <= yaml-loader` or `js-yaml-loader`

import SwaggerExpress from 'swagger-express-mw';
import SwaggerUi from 'swagger-ui-express';

import jsonServer from 'json-server';

const jsonServerRouter = jsonServer.router('src/fixtures/json-server-db.json');  // fake data from json-server
const jsonServerMiddlewares = jsonServer.defaults();  // include cors, json-parse, log, etc

import express from 'express';

const router = express.Router();
const app = express();

// import opn from 'opn';

// fake data
import usersGenerator from '../fixtures/users';
import books from '../fixtures/books.json';

const users = usersGenerator();

// allow cors for swagger
app.use(jsonServerMiddlewares);  // app.use(cors());

app.get('/', function(req, res) {
  res.send('Hello Mock API & SwaggerUI!');
});

// optional Way#1: api scheme provided by pure-express
router.get('/users', function(req, res) {
  res.send([users]);
});

router.post('/users', function(req, res) {
  res.status(201).send({});
});

router.get('/users/:id', function(req, res) {
  let data = users.filter(row => row.id == req.params.id);
  if(data.length === 0) {
    return res.status(404).send({});
  }
  res.send(data[0]);
});

router.delete('/users/:id', function(req, res) {
  res.status(201).send({});
});

router.put('/users/:id', function(req, res) {
  res.status(201).send({});
});

router.get('/users/:id/books', function(req, res) {
  res.send(books);
});

app.use('/api', router);

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

// integrated with swagger interactive doc mechanism
const SWAGGER_YAML = `dist/swagger.yaml`;

// const swaggerDocument = yaml.safeLoad(fs.readFileSync(SWAGGER_YAML, 'utf8'));
import swaggerDocument from '../../dist/swagger.yaml';  // handled by `js-yaml-loader` of webpack's loader

SwaggerExpress.create({  // copy fragment source code from swagger CLI tool of nodejs, there is not any document for this.
  appRoot: __dirname, // required config
  swaggerFile: SWAGGER_YAML,  // according to trace `swagger-node` project
}, function(err, swaggerExpress) {
  if (err) { throw err; }

  // To install middleware to check if apis existing or not.
  swaggerExpress.register(app);

  // To install swagger-ui for user to browser.
  app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
});

export default app;
