var express = require('express');
var partials = require('express-partials');

var app = express();

var Influence = require('sunlight-influence');
var influence = new Influence('28cc82e5bb4a4553a5fc352e09853270');
console.log('test');

influence.entityOverview('97737bb56b6a4211bcc57a837368b1a4', null, function(err, json) {
  if (err) throw err;
  console.log(json);
});
