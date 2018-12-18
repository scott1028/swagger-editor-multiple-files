'use strict';

// for swagger-extension of express
const fs = require('fs');
const yaml = require('js-yaml');
const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-ui-express');

const jsonServer = require('json-server');
const jsonServerRouter = jsonServer.router('src/fixtures/json-server-db.json');  // fake data from json-server
const jsonServerMiddlewares = jsonServer.defaults();  // include cors, json-parse, log, etc

var express = require('express');
var router = express.Router();
var app = express();

// for open browser automatically
const opn = require('opn');

const port = 3001;

// fake data
const users = require('../fixtures/users')();
const books = require('../fixtures/books.json');

// allow cors for swagger
app.use(jsonServerMiddlewares);  // app.use(cors());

app.get('/', function(req, res) {
  res.send('Hello Mock API!');
});

// optional Way#1: api scheme provided by pure-express
router.get('/users', function(req, res) {
  res.send(users);
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
      message: 'This is custom response format!',
    });
  }
  else {
    res.jsonp(res.locals.data);  // default render of json-server
  }
};

// integrated with swagger interactive doc mechanism
const SWAGGER_YAML = `public/swagger.yaml`;

const swaggerDocument = yaml.safeLoad(fs.readFileSync(SWAGGER_YAML, 'utf8'));
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

// bind to port of localhost
app.listen(port, function() {
  console.log(`Mock-Api-Server listening on port ${port}!`);
  opn(`http://localhost:${port}/api-docs`);
});
