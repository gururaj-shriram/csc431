/*
  name: app.js
  modified last by: guru
  date last modified: 8 apr 2018

  functions as our download REST controller
*/

var express = require('express');
var reload = require('reload')
var dataConverter = require('./converter/dataconverter')
var dataManager = require('./db/datamanager')
// For fake download page, can delete later
var dummyIndex = require('./routes/index');
var app = express();

const queryString = 'SELECT row_to_json(row(id, ST_AsGeoJSON(geom),wkt)) FROM construccion;';

console.log(dataConverter)
console.log(dataManager)

// Set port number if it's an argument
app.set('port', process.env.PORT || 3000);

// For fake download page, can delete later
app.use(require('./routes/index'));

// we have a single route which exposes the endpoint for this
// server
app.get('/download', (req, res) => {

	// Returns data asynchronously into a promise
	// Until the success callback is called, data has not been received by
	// the REST controller
	dataManager.fetchFromDb(queryString)
		.then((data) => {
			res.status(200) // success code
			.json({
				status: 'success',
				data: data,
				message: 'Got data from construccion'
			});	
		}, (error) => {
	
		});
});

var server = app.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});

reload(app);
