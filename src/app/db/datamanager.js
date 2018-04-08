/*
  name: datamanager.js
  modified last by: guru
  date last modified: 8 apr 2018
*/

const promise = require('bluebird');

const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);

const connection = {
    user: 'guru', // put your username for the db here
    host: '127.0.0.1', // don't change
    database: 'lasflores', // don't change
    password: '', // possibly, you may have a password
    port: 5432, // don't change
  };

const db = pgp(connection);

function fetchFromDb(queryString) {

  // Returns a promise
  return db.any(queryString, [true])
    .then(data => {
        return data;
    })
    .catch (err => {
      console.log(err.stack);
    });
}

module.exports.fetchFromDb = fetchFromDb
