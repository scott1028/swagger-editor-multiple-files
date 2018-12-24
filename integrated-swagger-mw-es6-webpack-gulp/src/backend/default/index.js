'use strict';

import express from 'express';
import session from 'express-session';

// fake data
import usersGenerator from '../../fixtures/users';
import books from '../../fixtures/books.json';

const sessCfg = {
  secret: 'keyboard cat',
  cookie: {}
};

const router = express.Router();
const users = usersGenerator();

export default app => {
  app.use(session(sessCfg));

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

  router.post('/login', function(req, res) {
    req.session.loggedIn = {
      userId: 1,
    };
    res.status(202).send({});
  });

  router.get('/logout', function(req, res) {
    delete req.session.loggedIn;
    res.status(202).send({});
  });

  app.use('/api', router);

  return app;
}
