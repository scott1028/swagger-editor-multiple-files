'use strict';

var faker = require('faker');

module.exports = () => {
  const data = { users: [] };
  // Create 1000 users
  for (let idx = 0; idx < 25; idx++) {
    data.users.push({
      id: idx + 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });
  }
  return data.users;
};
