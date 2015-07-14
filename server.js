var express = require('express');
var partials = require('express-partials');
var path = require('path');

var port = process.env.PORT || 4568;

var app = express();


app.use(express.static('client'));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.listen(port);
console.log('Server now listening on port ' + port);
