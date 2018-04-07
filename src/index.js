var express = require('express');
var app = express();

// Set port number if it's an argument
app.set('port', process.enc.PORT || 3000);

app.get('/', (req, res) => {
	res.send('<h1>Test Response</h1>');
});

var server = app.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});