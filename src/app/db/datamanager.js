/*
  name: datamanager.js
  modified last by: jerry
  date last modified: 8 apr 2018

*/
const { Pool, Client } = require('pg')

const client = new Client({
    user: 'Jerry', // put your username for the db here
    host: '127.0.0.1', // don't change
    database: 'lasflores', // don't change
    password: '', // possibly, you may have a password
    port: 5432, // don't change
  })
 client.connect()

function fetchFromDB(queryString) {

    // TODO: fetchFromDB runs asynchronously and so returns
    // before data is fetched. we need to use the package
    // pg-native, pg-sync, or use a promise
    client.query('SELECT row_to_json(row(id, ST_AsGeoJSON(geom),wkt)) FROM construccion;', (err, res1) => {
        // prints the data as geoJSON
        //console.log(res1.rows)
        return res1.rows
    })
}

module.exports.fetchFromDB = fetchFromDB
