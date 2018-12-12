'use strict';

var express = require('express');
var cors = require('cors')
var router = express.Router();
var app = express();
const port = 3001;

// fake data
const users = require('../fixtures/users')();
const books = require('../fixtures/books.json');

app.use(cors());

app.get('/', function(req, res) {
  res.send('Hello Mock API!');
});

// api scheme
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

// bind to port of localhost
app.listen(port, function() {
  console.log(`Mock-Api-Server listening on port ${port}!`);
});
