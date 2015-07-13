var express = require('express');
var partials = require('express-partials');
var jade = require('jade');
var path = require('path');

var port = process.env.PORT || 4568;

var app = express();

var Influence = require('sunlight-influence');

app.listen(port);
console.log('Server now listening on port ' + port);

app.set('view engine', 'jade');

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '/app/views', 'main.html'));
})