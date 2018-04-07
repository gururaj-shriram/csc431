var express = require('express');
var reload = require('reload')
var app = express();

// Set port number if it's an argument
app.set('port', process.env.PORT || 3000);

app.use(require('./routes/index'));

var server = app.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});

reload(app);
