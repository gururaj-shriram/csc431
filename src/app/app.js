/*
  name: app.js
  modified last by: jerry
  date last modified: 8 apr 2018

	functions as our download REST controller
*/

var express = require('express');
var reload = require('reload')
var dataConverter = require('./converter/dataconverter')
var dataManager = require('./db/datamanager')
var app = express();

console.log(dataConverter)
console.log(dataManager)
// Set port number if it's an argument
app.set('port', process.env.PORT || 3000);

// we have a single route which exposes the endpoint for this
// server
app.get('/download', (req, res) => {
	// should return data but prints undefined because of
	// asynchronous; see datamanger for details
	console.log(dataManager.fetchFromDB("dummy"))
});

var server = app.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});

reload(app);
