'use strict';

import express from 'express';

// fake data
import usersGenerator from '../../fixtures/users';
import books from '../../fixtures/books.json';

const router = express.Router();
const users = usersGenerator();

export default app => {
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

  return app;
}
