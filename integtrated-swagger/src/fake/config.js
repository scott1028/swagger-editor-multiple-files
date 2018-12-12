// // config.js
// module.exports = () => {
//   const data = { users: [] };
//   // Create 1000 users
//   for (let i = 0; i < 1000; i++) {
//     data.users.push({ id: i, name: 1 });
//   }
//   return data;
// }


var express = require('express');
var app = express();
const port = 3001;

app.get('/', function(req, res) {
  res.send('Hello Mock API!');
});

app.get('/users', function(req, res) {
  res.send(require('../fixtures/users')());
});

app.post('/users', function(req, res) {
  res.send(require('../fixtures/users')());
});

app.get('/books', function(req, res) {
  res.send(require('../fixtures/books.json'));
});

app.listen(port, function() {
  console.log(`Mock-Api-Server listening on port ${port}!`);
});
