'use strict';

const jsonServer = require('json-server');
const jsonServerRouter = jsonServer.router('src/fixtures/json-server-db.json');  // fake data from json-server
const jsonServerMiddlewares = jsonServer.defaults();  // include cors, json-parse, log, etc

var express = require('express');
var cors = require('cors')
var router = express.Router();
var app = express();
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

// bind to port of localhost
app.listen(port, function() {
  console.log(`Mock-Api-Server listening on port ${port}!`);
});
