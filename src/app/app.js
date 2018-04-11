/*
  name: app.js
  modified last by: jerry
  date last modified: 11 apr 2018
*/

var express = require('express');
var reload = require('reload')


// For fake download page, can delete later
//var dummyIndex = require('./routes/index');
var app = express();

// Set port number if it's an argument
app.set('port', process.env.PORT || 3000);

// For fake download page, can delete later
app.use("/", require('./routes/index'));

// for download REST endpoint
app.use("/download", require('./routes/download'));


var server = app.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});

reload(app);
