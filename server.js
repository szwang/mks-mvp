var express = require('express');
var partials = require('express-partials');
var path = require('path');

var port = process.env.PORT || 4568;

var app = express();

app.listen(port);
console.log('Server now listening on port ' + port);

app.use(express.static('app'));
